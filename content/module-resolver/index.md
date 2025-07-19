---
emoji: 🏷
title: Babel을 활용해 별칭 경로 설정하기
date: '2022-05-22'
author: Bomdong
tags: Javascript
categories: '#Etc'
---

## 들어가며

회사에서 소속팀이 변경되어 지금까지 봐오던 코드와 다른 코드를 보게 되었다. 그러다 눈에 띈 상단의 경로들.
대부분의 경로가 보다 짤막하고 `@디렉토리/디렉토리..` 의 형태로 이루어져있었다.
팀원분께 여쭈어보니 별칭 경로라는 걸 알게되었고, 보다 편리하게 개발할 수 있는 수단이라 생각되어 조금 더 배워보고 정리해본다.

### 별칭 경로를 사용하는 이유

Javascript/Typescript 환경에서 import 구문을 사용할 땐 보통 상대 경로를 사용한다.
이 때 각 모듈의 디렉토리 depth가 깊어진다면, 아래와 같이 보기만 해도 아찔한 경로를 사용해야한다.

```javascript
import component from '../../../../../../../../../directory/component';
```

이런 경우 아래와 같은 몇 가지 문제점이 존재한다.

1. 정확히 어느 경로에 있는 모듈인지 한 눈에 파악하기가 어렵다.
2. 경로를 작성할 때 오류가 날 가능성이 크다.

문제 해결을 위해선 경로를 알아보기 쉽게 + 깔끔하게 정리해주는 절대 경로를 활용할 수 있다.
여기서 더 나아가 절대 경로를 활용해 특정 디렉토리 경로에 별칭을 달아주는 별칭 경로를 활용한다면?

![module-resolver-img-1.jpeg](./module-resolver-img-1.jpeg)
_아, 이건 내가 설정한 별칭경로였지! 하며 경로를 보다 직관적으로, 편리하게 알 수 있다._

그 편리함을 느끼기 위한 별칭 경로 설정법, 지금부터 알아보자. <br/>
이해를 돕기위해 아래 디렉토리의 `index.tsx`에 `Colors.ts`와 `Commons.ts`를 import한다고 가정해본다.

```html
- 📂 src -- 📂 components ---- 📂 Input ------ 📂 PriceInput -------- 📂 SmallInput ----------- 📄
index.tsx -- 📂 styles ----- 📄 Colors.ts ----- 📄 Commons.ts - 📄 App.tsx
```

상대경로와 절대경로를 사용한 코드는 각각 아래와 같다.

```javascript
//index.tsx

//상대경로
import Colors from '../../../styles/Colors.ts';
import Colors from '../../../styles/Commons.ts';

//절대경로
import Colors from '@styles/Colors.ts';
import Colors from '@styles/Commons.ts';
```

비교를 통해 알 수 있듯이, 절대경로를 사용하면 경로가 훨씬 쉽게 들어오고 혹시 모를 경로 작성 오류도 예방할 수 있다.
그럼 이렇게 편리한 절대경로를 설정하는 법을 알아보자. 생각보다 훨씬 간단하다.

## 1. 자바스크립트/타입스크립트 컴파일러 설정

자바스크립트/타입스크립트 컴파일러가 절대 경로를 이해할 수 있게 해주자. <br/>
`jsconfig.json`에 (Typescript는 `tsconfig.json`) 아래 속성을 추가하면 @src가 root의 src 폴더임을 알려준다.

```javascript
{
  "compilerOptions": {
      ....
    //컴파일러가 모듈을 찾을 때 기준이 되는 경로(아래처럼 paths를 작성하면 필수)
    "baseUrl": ".",
    //{별칭 : baseUrl 기준 실제 모듈의 위치}의 형식으로 절대 경로 설정
    "paths": {
        "@/*": ["src/*"]
        },
  },
  "includes": ["src"]
}
```

## 2. Babel 설정

여기까지 진행한 뒤 컴파일된 js파일을 실행하면 모듈 경로를 불러올 수 없다는 오류(Error: Cannot faind module ~ )가 난다.
그래서 필요한 것이 Babel(Javascript 트랜스파일 도구) 설정과 module-resolver 플러그인.

### 2-1. module-resolver 설치

module-resolver 플러그인의 공식홈페이지엔 아래와 같이 적혀있다.

> A Babel plugin to add a new resolver for your modules when compiling your code using Babel. This plugin allows you to add new "root" directories that contain your modules. It also allows you to setup a custom alias for directories, specific files, or even other npm modules.

한줄 요약 : Babel을 사용해 컴파일하는 코드에서 root디렉토리를 추가하거나 alias custom을 하고싶다면 이 플러그인을 써라!
그렇다면 명령어를 통해 설치해주자.

```
// using npm
$ npm install --save-dev babel-plugin-module-resolver
// using yarn
$ yarn add --dev babel-plugin-module-resolver
```

### 2-2. babelrc 설정

Babel이 코드를 compile할 때 절대 경로를 이해할 수 있도록 설정해보자.
root경로의 `.babelrc`에 설정을 추가해서 어떤 별칭(alias)을 어떤 경로로 트랜스파일 해줄것인지 알려주어야 한다.

```javascript
{
  "plugins": [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@": "./src",
        },
      },
    ],
  ]
}
```

위 작업까지 마치면 styles 디렉토리 안의 경로를 작성할 때 @styles/~로 간단하게 작성할 수 있다. 🥳

## 참고자료

<a target="_blank" >https://www.npmjs.com/package/babel-plugin-module-resolver</a> <br/>
<a target="_blank" >https://www.daleseo.com/js-babel-resolver/</a>

```toc

```
