---
emoji: ๐
title: commitizen์ผ๋ก ๋ณด๋ค ์ฝ๊ฒ commit convention ์งํค๊ธฐ
date: '2022-05-30'
author: Bomdong
tags: Git
categories: Git
---

## ๋ค์ด๊ฐ๋ฉฐ
์ต๊ทผ ์์ ๋ถ๋ถ๋ถํฐ ํ๋ฌธํ๋ฅผ ๊ฐ์ ํ๋ ๋ฐ์ ๊ด์ฌ์ด ์๊ฒผ๊ณ , 1์์๋ก ๋์ ๋ค์ด์จ ๊ฑด Commit Convention์ด์๋ค. 
Commit Convention์ ์ ํ๊ณ , ์์ผ๋ก๋ ๊ณ์ ์ง์ผ๋๊ฐ๊ธฐ ์ํด ์์ํ ์์คํ์ ๊ตฌ์ถํ ์ด์ผ๊ธฐ๋ฅผ ์ ์ด๋ณด๋ ๊ธ.

### ๋ฌธ์ ์ 
1. ํ์๋ณ๋ก commit style์ด ํต์ผ๋์ง ์์๋ค.
   (๊ฐ์ ๋ค๋ฅธ ๊ธฐ์ค์ผ๋ก ์ ํด์ง commit Header๋ฅผ ์ฌ์ฉํ๊ณ , ์ฒซ๊ธ์๋ฅผ ๋๋ฌธ์๋ก/์๋ฌธ์๋ก ์์ฑํ๋์ง๋ ์ฐจ์ด๊ฐ ์์๋ค.)
2. commit convention์ ์ ํ๋ ๊ฒ๋ณด๋ค ๊พธ์คํ, ํผ์ ์์ด ์งํค๋ ๊ฒ ์ด๋ ต๋ค.

### ํด๊ฒฐ๋ฐฉ์
1. commit์ ๋ชฉ์ ๋ณ๋ก Header๋ฅผ ์ ํด commit๋ง ๋ด๋ ์ด๋ค ์์์ธ์ง ์์๊ฐ๋๋ก ํ์.
2. commitizen์ ์ด์ฉํด Header ์๋ ฅ์ ๋ฐ์๋ํํ๊ณ , ์์ธ ์์๋ง ์ง์  ์์ฑํ๋ ์์คํ์ ๊ตฌ์ถํด๋ณด์.
   (commitizen์ ํ์๋ถ๊ณผ ์ด์ผ๊ธฐ๋ฅผ ํด๋ณด๋ค๊ฐ ํํธ๋ฅผ ์ป์๋ค.)

### Commit Convention ์ ํ๊ธฐ
๊ธ๋ฐฉ ๋๋ ๊ฑฐ๋ผ ์๊ฐํ์ง๋ง ์๊ฐ๋ณด๋ค ์ธ์ธํ ๋ฒ์๊น์ง ํ์ํ๋ฉฐ ๊ฝค ์๊ฐ์ด ๊ฑธ๋ ธ๋ convention ์ ํ๊ธฐ.
๋ช ๊ฐ์ง ๊ฒฝ์ฐ๋ง ์๋ฅผ ๋ค์ด๋ณด์๋ฉด,

๐ค : ๊ธฐ๋ฅ ์ถ๊ฐ๋ Feat์ด๋ผ๊ณ  ํ์. <br/>
๐ฅ :  ๊ธฐ๋ฅ์ ๋ฒ์๊ฐ ๋ฌด์์ธ๊ฐ? (ํจ์๋ง? UI, UX ๊ด๋ จ๋ ํฌํจํ๋๊ฐ? CSS๋ ํฌํจํ๋๊ฐ?)

๐ค : ์ฝ๋ ์์ ์ Modify๋ฅผ ์ฌ์ฉํ์ <br/>
๐ฅ  : ์ฝ๋ ์์ ์ ๋ฒ์๋ ์ด๋์๋ถํฐ ์ด๋๊น์ง์ธ๊ฐ? ์ฝ๋ ์ญ์ ๋ Modify์ ๋ฒ์ฃผ์ ๋ค์ด๊ฐ๋๊ฐ? <br/>
๐ฅ : ๋จ์ ์คํ์์ ๊ณผ ๊ธฐ๋ฅ ์์ ์ ๋์ผํ Header์ ๋ ๊ฒ์ธ๊ฐ?

![commitizen-img-1.jpeg](./commitizen-img-1.jpeg)
*์ฝ์ง์๋ค*

์์ํ๋ ๊ฒ๋ณด๋ค ๋ ๊น๊ฒ ์์ ํ  ์ฝ๋์ ๋ฒ์๋ฅผ ์ธ๋ถํํ๊ณ (ํจ์, UI, package ๊ด๋ จ ๋ฑ) 
ํน์  ์์ธ์ผ์ด์ค๋ฅผ ๊ณ ๋ คํด(๋จ์ ์คํ ์์ , ํ๋ก๋์ ์ฝ๋์ ์ํฅ์ด ์๋ ํฌ๋งทํ ์์  ๋ฑ) ํ์๋ฅผ ๋ง์น  ์ ์์๋ค.

## Commitizen์ผ๋ก Commit Convention ์งํค๊ธฐ

`Commitizen`์ ์ผ์ ํ commit message๋ฅผ ์์ฑํ๊ธฐ ์ํ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ก, 
์๋ ์ฌ์ง์ฒ๋ผ commit Header๋ฅผ ๊ฐ๋จํ๊ฒ ์ ํํ๊ณ  ์ดํ ๊ด๋ จ๋ Scope, Description, Issues ๋ฑ์ ์๋ ฅํ๋ ํํ๋ก commit์ ์์ฑํ  ์ ์๋ค. 
(Header์์ ๊ท์ฌ์ด emoji๋ ๋คโจ)

`cz-customizable` ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ Commitizen์ ์ ์ฉ๋  commiting rule์ ์ปค์คํํ  ์ ์๋๋ก ๋์์ฃผ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ก, Commitizen + cz-customizable ์กฐํฉ์ ํตํด ์์ฝ๊ฒ commit convention์ ๊ด๋ฆฌํ  ์ ์๋ค.

![commitizen-img-2.png](./commitizen-img-2.png)

### 1. Commitizen, cz-customizable ์ค์น

```html
$ npm install --save-dev commitizen cz-customizable
//using yarn
$ yarn add -D commitizen cz-customizable
```
### 2. package.json์ config์ commitizen config ์ถ๊ฐํ๊ธฐ

```html
{
  ....
  "devDependencies": {
    ...,
  },
  "config": {
    "commitizen": {
      "path": "cz-customizable"
    }
  }
}
```

### 3. root ๊ฒฝ๋ก์ cz-config.js ํ์ผ ์์ฑ ๋ฐ ๋ด์ฉ ์๋ ฅํ๊ธฐ
์๋์ ํ์๋๋ก CLI๋ฅผ ์ปค์คํํ๊ธฐ ์ํ ๋ด์ฉ์ ์๋ ฅํด์ค๋ค. <br/>
๊ฐ์ฒด์ `value`๋ commit Header, `name`์ ๊ฐ๊ฐ์ Header์ ๋ํ ์ค๋ช์ด๋ผ๊ณ  ์๊ฐํ๋ฉด ๋๋ค.

````
module.exports = {

    types: [
        { value: 'โจ Feat', name: 'โจ Feat:\tAdd a new feature' },
        { value: '๐ Modify', name: '๐ Fix:\tModify production, UI,UX code' },
        { value: '๐ Docs', name: '๐ Docs:\tAdd or update documentation' },
        {
          value: '๐ Style',
          name: '๐ Style:\tAdd or update code format (not updation production, UI,UX code)',
        },
        { value: '๐ค Refactor',
          name: '๐ค Refactor:\tCode change that neither fixes a bug nor adds a feature',
        },
        {
          value: 'โ Test',
          name: 'โ Test:\tCode change related with tests cases',
        },
        {
          value: '๐ Chore',
          name: '๐ Chore:\tChanges to the build process or auxiliary tools\n\t\tand libraries such as documentation generation',
        },
    ],
    allowCustomScopes: false,
    allowBreakingChanges: ['feat', 'fix'],
    skipQuestions: ['body'],
    subjectLimit: 100,
};
````

### 4. package.json ํ์ผ์ commitizen์ ์คํํ  ์ ์๋ script ์ถ๊ฐํ๊ธฐ
   key๊ฐ์ commitizen์ ์คํํ  ์ ์๋ ๋ช๋ น์ด๋ก, ์๋์ฒ๋ผ ์๋ ฅํ  ๊ฒฝ์ฐ `yarn commit`์ ์์ฑํ๋ฉด commitizen์ ์คํ์ํฌ ์ ์๋ค.

````html
{
  "scripts": {
    ...,
    "commitโ: "cz"  //yarn commit์ผ๋ก ์คํํ๋๋ก custom
  },

  "dependencies": {
    ...
  }
}
````

### 5. ์คํํ๊ธฐ
ํ์ผ ๋ณ๊ฒฝ ํ ์ด์ ๊ณผ ๋์ผํ๊ฒ `git add .` ํ, ์ด์  ๋จ๊ณ์์ ์ถ๊ฐํ ์คํ script (์์ ๊ธฐ์ค์ผ๋ก `yarn commit`)๋ฅผ ์๋ ฅํ๋ฉด commitizen์ด ์คํ๋๋ค.

````html
$ git add .

//using npm
$ npm run commit

//using yarn
$ yarn commit
````

![commitizen-img-2.png](./commitizen-img-2.png)
*์คํ ํ๋ฉด*

 commitizen์ด ์คํ๋๋ฉด ๋ฐฉํฅํค, ์ํฐ๋ฅผ ํตํด commit Header๋ฅผ ์ ํํ๋ค.

<br/>

![commitizen-img-3.png](./commitizen-img-3.png)

Header๋ฅผ ์ ํํ๋ฉด ์์ฐจ์ ์ผ๋ก ํด๋น commit์ ๊ด๋ จ๋ Scope, Description, Issues๋ฅผ ์๋ ฅํ๊ธฐ์ํ ์ง๋ฌธ์ด ๋ณด์ฌ์ง๋ค. 
(ํ์ฌ ํ์์  Description๋ง ์๋ ฅํ๊ณ  ์์ด์ ๋ค๋ฅธ ์ฌํญ์ ์๋ตํ ์ฑ๋ก ์๋ ฅํ๋ค.)

์๋ ฅ์ ๋ง์น๋ฉด ์์ฑํ commit ๋ฏธ๋ฆฌ๋ณด๊ธฐ์ ํจ๊ป ํ์ธ ์ง๋ฌธ์ด ๋ณด์ฌ์ง๊ณ , ๋ง์ง๋ง ํ์ธ๊น์ง ๋ง์น๋ฉด commit ์๋ฃ!

์์ธ ์ค๋ช์ ๋ณด๋ฉด์ commit Header๋ฅผ ์ ํํ๊ณ , ์ด์ด์ง๋ ์ง๋ฌธ์ ์๋ตํ๋ ํ์์ผ๋ก commit message๋ฅผ ์์ฑํ ๋ค ์ต์ขํ์ธ๊น์ง ํ  ์ ์์ด ์๊ฐ์ ์ธ ์ค๊ธฐ๋ Header์ ๋์๋ฌธ์ ํผ์  ๋ฑ์ ๋ฐฉ์งํ  ์ ์๋ ํด์ด๋ผ๋ ์๊ฐ์ด ๋ ๋ค.


## ์ฐธ๊ณ  ์๋ฃ
<a target="_blank" href="https://blog.dnd.ac/github-commitzen-template/">git commitizen์ ์ฌ์ฉ๋ฐฉ๋ฒ ๋ฐ template์ ๋ํด์ ์์๋ณด๊ธฐ</a> <br/>
<a target="_blank" href="https://www.npmjs.com/package/commitizen">commitizen-npm</a> <br/>
<a target="_blank" href="https://dev.to/sohandutta/make-everyone-in-your-project-write-beautiful-commit-messages-using-commitlint-and-commitizen-1amn">Make everyone in your project write beautiful commit messages using commitlint and commitizen ๐</a>




```toc
```