---
emoji: ๐จ
title: Storybook์์ SVG import Error ํด๊ฒฐํ๊ธฐ
date: '2022-12-18'
author: Bomdong
tags: css
categories: CSS
---

## ๋ฌธ์ ์ํฉ
ํ์ฌ ํ๋ก์ ํธ์ ๋๋์ด storybook์ ๋์ํ๊ฒ๋์ด ์ฑ๊ธ๋ฒ๊ธํ๋ ๊ฒ๋ ์ ์.. <br/>
storybook์ ์ค์นํด ์คํํ๊ณ  ๊ธฐ์กด์ ๋ง๋ค์ด๋์๋ component์ story๋ฅผ ํ๋ํ๋ ์์ฑํ๋๋ฐ
SVG ํ์ผ์ด import๋ component์์  undefined๊ฐ ๋ ๋๋๋ค๋ ์๋์ ์๋ฌ๊ฐ ๋ด๋ค.


```
Storybook: Element type is invalid: expected a string (for built-in components) 
or a class/function (for composite components) but got: undefined.
```

ํด๋น ์๋ฌ๋ storybook์ ๊ธฐ๋ณธ ์นํฉ ์ค์ ์์ svg ํ์ผ์ `file-loader`๋ก ๋ณํํ๊ณ  ์๊ธฐ ๋๋ฌธ์ ๋๋ ๊ฒ.

React cra๋ก ์ด๊ธฐ์ํ์ ํ๋ฉฐ storybook์ ํจ๊ป ์ ์ฉํ  ๋๋ ํด๋น ์๋ฌ๊ฐ ๋์ง์์๊ณ  <br/>
monorepoํ๊ฒฝ์ ๊ธฐ์กด ํ๋ก์ ํธ (w/ React+Typescript)์ ์ ์ฉํ ๋๋ง ๋ฌ๋ค.
    

## ํด๊ฒฐ๋ฒ
๊ธฐ์กด ์นํฉ ์ค์ ์์ svg์ ๊ด๋ จ๋ ์ค์ ์ ์ญ์ ํ๊ณ , SVG๋ฅผ React Component๋ก ๋ณํํด์ฃผ๋ tool์ธ <a target="_black" href="https://react-svgr.com/docs/webpack/">SVGR</a>์ ํตํด
SVG๋ฅผ ๋ก๋ํ๋๋ก ์ค์ ํด ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ  ์ ์๋ค.

### 1. SVGR ์ค์น
๋จผ์ , ๊ธฐ์กด svg ์ฒ๋ฆฌ ์ค์ ์ ๋์ฒดํ  SVGR์ ์ค์นํ๋ค.

```
npm install --save-dev @svgr/webpack
// use yarn
yarn add --dev @svgr/webpack
```

### 2. webpack ์ค์ 
`main.js` ํ์ผ์ ์๋์ ๊ฐ์ด webpackFinal ์ค์ ์ ์ถ๊ฐํด ๊ธฐ์กด ์นํฉ ์ค์ ์์ svg์ ๊ด๋ จ๋ ๋ถ๋ถ์ ์ญ์ ํ๊ณ , SVGR์ ์ฌ์ฉํ๋๋ก ์ถ๊ฐํด์ค๋ค.

```javascript
//main.js

module.exports = {
  webpackFinal: async (config) => {
  //๊ธฐ์กด ์นํฉ ์ค์ ์์ svg ์ค์  ์ ์ธ
    const newRules = config.module.rules.filter((rule) => !rule.test.test(".svg"));
  //@svgr/webpack ์ ์ฌ์ฉํ๋๋ก push
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
์ธํฐ๋ท์์ ์ฌ๋ฌ ๋ฐฉ๋ฒ์ ์ฐพ๋ค๊ฐ 8line์ `url-loader`๊ฐ ์ ์ธ๋ ํด๊ฒฐ์ฑ๋ ๋ฐ๊ฒฌํ์๋๋ฐ ๋์ ๊ฒฝ์ฐ์๋ ํด๋น ํค์๋๋ฅผ ์ ์ธํ  ๊ฒฝ์ฐ ๋ฌธ์ ๊ฐ ํด๊ฒฐ๋์ง ์์๋ค. 
ํน์ ๊ฐ์ ๋ฌธ์ ๋ฅผ ๊ฒช๊ณ  ์๋ ๋ถ์ด ๊ณ์๋ค๋ฉด ํจ๊ป ์ฑ๊ฒจ๋ด๋ณด์๊ธธ ๊ถ์ฅ๋๋ฆฐ๋ค.
```toc
```