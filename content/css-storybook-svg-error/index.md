---
emoji: 🎨
title: Storybook에서 SVG import Error 해결하기
date: '2022-12-18'
author: Bomdong
tags: css
categories: '#Web'
---

## 문제상황

회사 프로젝트에 드디어 storybook을 도입하게되어 싱글벙글했던 것도 잠시.. <br/>
storybook을 설치해 실행하고 기존에 만들어두었던 component의 story를 하나하나 작성하는데
SVG 파일이 import된 component에선 undefined가 렌더된다는 아래의 에러가 떴다.

```
Storybook: Element type is invalid: expected a string (for built-in components)
or a class/function (for composite components) but got: undefined.
```

해당 에러는 storybook의 기본 웹팩 설정에서 svg 파일을 `file-loader`로 변환하고 있기 때문에 나는 것.

React cra로 초기셋팅을 하며 storybook을 함께 적용할 때는 해당 에러가 나지않았고 <br/>
monorepo환경의 기존 프로젝트 (w/ React+Typescript)에 적용할때만 났다.

## 해결법

기존 웹팩 설정에서 svg와 관련된 설정을 삭제하고, SVG를 React Component로 변환해주는 tool인 <a target="_black" href="https://react-svgr.com/docs/webpack/">SVGR</a>을 통해
SVG를 로드하도록 설정해 문제를 해결할 수 있다.

### 1. SVGR 설치

먼저, 기존 svg 처리 설정을 대체할 SVGR을 설치한다.

```
npm install --save-dev @svgr/webpack
// use yarn
yarn add --dev @svgr/webpack
```

### 2. webpack 설정

`main.js` 파일에 아래와 같이 webpackFinal 설정을 추가해 기존 웹팩 설정에서 svg와 관련된 부분을 삭제하고, SVGR을 사용하도록 추가해준다.

```javascript
//main.js

module.exports = {
  webpackFinal: async (config) => {
  //기존 웹팩 설정에서 svg 설정 제외
    const newRules = config.module.rules.filter((rule) => !rule.test.test(".svg"));
  //@svgr/webpack 을 사용하도록 push
    newRules.push({ test: /\.svg$/, use: ["@svgr/webpack", "url-loader"] });
    return {
      ...config,
      module: {
        ...config.module,
        rules: newRules,
      },
    };
  },
 ...
};
```

인터넷에서 여러 방법을 찾다가 8line의 `url-loader`가 제외된 해결책도 발견했었는데 나의 경우에는 해당 키워드를 제외할 경우 문제가 해결되지 않았다.
혹시 같은 문제를 겪고 있는 분이 계시다면 함께 챙겨봐보시길 권장드린다.

```toc

```
