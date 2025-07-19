---
emoji: 🚀
title: Next.js에서 yarn start를 실행하면 어떻게 될까
date: '2023-07-02'
author: Bomdong
tags: Next.JS
categories: '#Next.js'
---

## 들어가며

흔히 local 환경에서 Next.js 프로젝트를 만들고 `yarn start`를 실행하면 command line에 아래의 흐름대로 표기된다.

```
> yarn start
yarn run v1.22.19
$ next start
ready - started server on 0.0.0.0:${port}, url: http://localhost:${port}
```

그렇다면 뒷편에선 코드가 어떻게 돌아가고 있을까?

## package.json

[Next.js 공식 문서](https://nextjs.org/docs/getting-started/installation#manual-installation)에 따르면,
새로운 프로젝트를 만들 때 필요한 패키지 설치 후 `package.json`에 아래 내용을 수동으로 추가하라고 안내하고 있다.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

이 중 주목할 스크립트는 `start`로, 해당 스크립트를 입력하면 `next start` 코드가 실행된다.

> yarn start 혹은 npm run start으로 입력하면 된다.

## next-start.ts

코드가 실행되면 그 이후엔 어떤 파일을 실행시킬까 살펴보니 `packages/next/src/cli` 경로에 `next-start.ts`가 있었다.
코드를 보니 next start 뒤에 위치하는 옵션 command에 대한 안내를 해주는 로직, 혹여나 잘못 입력했을 때 경고 및 프로세스를 종료하는 로직 등이 담겨있다.

```typescript
// 옵션 명시 및 검증
const nextStart: CliCommand = async (argv) => {
  const validArgs: arg.Spec = {
    // Types
    '--help': Boolean,
    '--port': Number,
    '--hostname': String,
    '--keepAliveTimeout': Number,

    // Aliases
    '-h': '--help',
    '-p': '--port',
    '-H': '--hostname',
  }
  let args: arg.Result<arg.Spec>
  try {
    args = arg(validArgs, { argv })
  } catch (error) {
      //잘못된 cli command를 입력했을 때
    if (isError(error) && error.code === 'ARG_UNKNOWN_OPTION') {
      return printAndExit(error.message, 1)
    }
    throw error
  }


  if (args['--help']) {
    //  .. cli command 설명 출력 및 프로세스 종료..
  }

  // 서버 실행에 필요한 변수 선언
  const dir = getProjectDir(args._[0])
  const host = args['--hostname']
  const port = getPort(args)

  //  keepAliveTimeout 옵션 확인
  const keepAliveTimeoutArg: number | undefined = args['--keepAliveTimeout']
  if (
    typeof keepAliveTimeoutArg !== 'undefined' &&
    (Number.isNaN(keepAliveTimeoutArg) ||
      !Number.isFinite(keepAliveTimeoutArg) ||
      keepAliveTimeoutArg < 0)
  ) {
    printAndExit(
      `Invalid --keepAliveTimeout, expected a non negative number but received "${keepAliveTimeoutArg}"`,
      1
    )
  }

  const keepAliveTimeout = keepAliveTimeoutArg
    ? Math.ceil(keepAliveTimeoutArg)
    : undefined

  const config = await loadConfig(
    PHASE_PRODUCTION_SERVER,
    resolve(dir || '.'),
    undefined,
    undefined,
    true
  )

//생략
```

그리고 가장 하단에서 `startServer`라는 함수를 실행시켜 준다.

```typescript
//...
//  서버 실행
await startServer({
  dir,
  isDev: false,
  hostname: host,
  port,
  keepAliveTimeout,
  useWorkers: !!config.experimental.appDir,
});
```

> 정확한 버전은 모르지만 작년 무렵만 해도 아래처럼 바로 startServer 함수 실행 후 appUrl을 만들고 console에도 출력하는 형태였는데,
> 현재는 startServer함수 실행까지만 하고 appUrl을 만들고 커맨드라인에 출력하는 로직은 분리되어있다.

```typescript
startServer({
  dir,
  hostname: host,
  port,
  keepAliveTimeout,
})
  .then(async (app) => {
    const appUrl = `http://${app.hostname}:${app.port}`;
    Log.ready(`started server on ${host}:${app.port}, url: ${appUrl}`);
    await app.prepare();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
```

## start-server

그럼 startServer 함수는 어떻게 이루어져있는지 살펴보자.
코드 전문은 [여기](https://github.com/vercel/next.js/blob/canary/packages/next/src/server/lib/start-server.ts)에서 확인할 수 있다.

우선 아래와 같이 `createServer`로 웹 서버 객체를 만든다.
([node 공식문서](https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction)에 따르면, 모든 node 웹 서버 애플리케이션은 웹 서버 객체를 만들어야 한다.)

```typescript
// setup server listener as fast as possible
const server = http.createServer(async (req, res) => {
  try {
    if (handlersPromise) {
      await handlersPromise;
      handlersPromise = undefined;
    }
    sockets.add(res);
    res.on('close', () => sockets.delete(res));
    await requestHandler(req, res);
  } catch (err) {
    res.statusCode = 500;
    res.end('Internal Server Error');
    Log.error(`Failed to handle request for ${req.url}`);
    console.error(err);
  }
});
// ...
```

<br/>
    
이후 error가 생겼을 때, timeout이 일어났을 때 (keepAliveTimeout 옵션)에 따라 분기처리를 해주다 서버를 실행시켜준다.
이 때 host와 port가 포함된 appUrl을 생성하고`Log.ready ..` 부분을 통해(실제로는 console.log()함수) 
우리가 실제로 보게 되는 `ready - started server on 0.0.0.0:${port}, url: http://localhost:${port}`을 출력시킴을 알 수 있다.

```typescript
// ...
await new Promise<void>((resolve) => {
  server.on('listening', () => {
    const addr = server.address();
    port = typeof addr === 'object' ? addr?.port || port : port;

    let host = !hostname || hostname === '0.0.0.0' ? 'localhost' : hostname;

    let normalizedHostname = hostname || '0.0.0.0';

    if (isIPv6(hostname)) {
      host = host === '::' ? '[::1]' : `[${host}]`;
      normalizedHostname = `[${hostname}]`;
    }
    targetHost = host;

    const appUrl = `http://${host}:${port}`;

    if (isNodeDebugging) {
      const debugPort = getDebugPort();
      Log.info(
        `the --inspect${
          isNodeDebugging === 'brk' ? '-brk' : ''
        } option was detected, the Next.js proxy server should be inspected at port ${debugPort}.`,
      );
    }

    Log.ready(
      `started server on ${normalizedHostname}${
        (port + '').startsWith(':') ? '' : ':'
      }${port}, url: ${appUrl}`,
    );
    resolve();
  });
  server.listen(port, hostname);
});
//...
```

서버가 실행되면, `Log.ready ..` 부분을 통해 우리가 실제로 보게 되는 커맨드 라인을 출력시킨다.

```
ready - started server on 0.0.0.0:${port}, url: http://localhost:${port}
```

<br/>

> Next.js 코드를 뜯어본 건 처음인데 살펴본 파일의 모든 코드를 완벽하게 이해하기는 쉽지않았지만 그래도 더듬더듬.. 큼직한 줄기 중심으로 읽어나가는 재미가 있었다.
> Next.js를 현업에서 사용하고 있지는 않지만 공식문서 번역에도 참여해보고 앞으로 진행할 사이드 프로젝트에서도 사용하게 된 만큼 동작 원리를 생각하며 더 가까워지기를!

```toc

```
