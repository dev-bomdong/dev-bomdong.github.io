---
emoji: ๐
title: ์ ์ฐจ ๋๋ ค์ง๋ Count ์ ๋๋ฉ์ด์ ๊ตฌํํ๊ธฐ
date: '2022-07-18'
author: Bomdong
tags: React
categories: React
---

## ๋ค์ด๊ฐ๋ฉฐ
์ฐ๋ฆฌ๋ ์ข์ข ์ซ์๋ฅผ countํ๋ ์ ๋๋ฉ์ด์์ ์ ํ๊ฒ๋๋ค.
์๋ฅผ ๋ค์ด ๊ฒ์ ํ๋ฉด์์ ์ ์ ๊ฐ ํ๋ํ ํฌ์ธํธ๋ฅผ ๋ณด์ฌ์ค ๋, ํ ์ธ๋ ๊ฐ๊ฒฉ์ ์๋ดํ  ๋, D-day๊น์ง ๋จ์ ์ผ์๋ฅผ ๋ณด์ฌ์ค ๋ ๋ฑ๋ฑ ์ซ์๊ฐ์ ๊ฐ์กฐํด์ผํ๋ ์ํฉ์์ ์์ฃผ ์ฌ์ฉ๋๋ค.

๊ทธ๋ผ ์ด ์ ๋๋ฉ์ด์์ ์ด๋ป๊ฒ ๊ตฌํํด์ผํ ๊น? 
๋จ์ํ count ์ ๋๋ฉ์ด์์ ์๊ฐํ๊ณ  setInterval๋ก ๊ธ๋ฐฉ ๊ตฌํํ๊ฒ ๋ค!ํ๋ฉฐ ํธ๊ธฐ๋กญ๊ฒ ์ ๊ทผํ๋ค๊ฐ 
count ์๋๋ฅผ ์กฐ์ ํ๋ ๋ฐฉ๋ฒ์ด ๊น๋ค๋ก์ ํผ์ญ์ด ๋ ๊ทธ ์ฌ์ ์ ๊ธฐ๋กํด๋ณด๊ณ ์ ํ๋ค. 
ํด๋น ๊ธฐ๋ฅ์ ์ฌ์ฌ์ฉ์ฑ์ ๊ณ ๋ คํด custom Hook์ผ๋ก ๊ตฌํํ๋ค.

## 1. setInterval ํจ์๋ก ์ ๋๋ฉ์ด์ ๊ตฌํ
์ฐ์  ๋จ์ํ ์ซ์๋ฅผ countํ๋ ์ ๋๋ฉ์ด์๋ถํฐ ๊ตฌํํด๋ณด์.
์ซ์๋ฅผ ์นด์ดํธํ๋ ์ ๋๋ฉ์ด์์ ์ผ์  ๊ธฐ๊ฐ๋์ ํน์  ์์์ ๋ฐ๋ณต ์คํํ๋ setInterval ํจ์๋ก ๊ตฌํํ  ์ ์๋ค.

setInterval ํจ์์ ๊ตฌ์กฐ ๋ฐ ์ฌ์ฉ์์๋ ์๋์ ๊ฐ๋ค.

```javascript
//๊ตฌ์กฐ
setInterval(๋ฐ๋ณต ์คํํ  ํจ์, ํจ์๋ฅผ ๋ฐ๋ณต ์คํํ  ๊ธฐ๊ฐ(ms));

//์ฌ์ฉ์์
const useInterval = setInterval(function, 300ms); 
clearInterval(useInterval);
```

์ด๋ฅผ ์ด์ฉํด ์ฐ์  ๋์ผํ ์๋๋ก ์ซ์๋ฅผ countํ๋ custom hook์ธ `useCountUp`์ ๊ตฌํํด๋ณด์.

### ๊ตฌํ ์ฝ๋

```typescript
/** count up ํจ์ */
const useCountUp = (num: number, duration: number) => {
  const [count, setCount] = useState(0)
  const frameRate = 1000 / 60
  const totalFrame = Math.round(duration / frameRate)

// useEffect๋ก mount๋๋ ์๊ฐ ํ ๋ฒ ์คํ
  useEffect(() => {
    let currentNumber = 0
    
// setInterval๋ก setCount
    const counter = setInterval(() => {
      const progressRate = ++currentNumber / totalFrame
      setCount(Math.round(num * progressRate))

// ์งํ ์๋ฃ์ interval ํด์ 
      if (progressRate === 1) {
        clearInterval(counter)
      }
    }, frameRate)
  }, []) 

// setIntervalํจ์์์ ์ธํํ count return
  return count
}
```

์ฃผ์์ผ๋ก ๊ฐ ๋จ๊ณ๋ฅผ ์ ์ด๋๊ธด ํ์ง๋ง ์ข๋ ์์ธํ๊ฒ ์์๋ณด๋ฉด,


1๏ธโฃ custom hook `useCountUp`์ ์ ์ธํ๊ณ , useEffect๋ก mount๋๋ ์ด๊ธฐ์ 1๋ฒ ์คํ๋๋๋ก ํ๋ค. <br/>

2๏ธโฃ useEffect์ ๋ด๋ถ์ setInterval ํจ์ `counter`๋ฅผ ์ ์ธํ๋ค.

์ฒซ ๋ฒ์งธ ์ธ์์ธ **๋ฐ๋ณต์คํ์ํฌ ํจ์**๋ (1) count๋ฅผ ์ฆ๊ฐ์ํค๊ณ  
(2) ์งํ์ด ์๋ฃ๋๋ฉด clearInterval ํจ์๋ฅผ ํธ์ถํ๋ ํจ์,
๋ ๋ฒ์งธ ์ธ์์ธ **๋ฐ๋ณต ๊ธฐ๊ฐ**์๋ `frameRate(1000ms / 60frame, ์ฆ 16.6ms)`๋ฅผ ์ ๋ฌํด์ค๋ค.

3๏ธโฃ useCountUp์ setInterval ํจ์์์ ์ฆ๊ฐ์์ผฐ๋ `count`๋ฅผ returnํ๋ค.

> ์ด ๋ ์ ๋๋ฉ์ด์์ด ์ ์ฉ๋๋ ์ซ์ ๋ถ๋ถ์ width๊ฐ์ ์ฃผ์ง ์์ผ๋ฉด ๋ค๋ฅธ ๊ธ์๋ค์ด ์ข์ฐ๋ก ๋จ๋ฆฌ๋ ํ์์ด ์ผ์ด๋๋ค.

### ๊ฒฐ๊ณผ ํ๋ฉด

![count-img-2.gif](./count-img-2.gif)

์ผ์ ํ ์๋๋ก ์ฆ๊ฐํ๋ค๊ฐ ๋ชฉํ๊ฐ์ ๋๋ฌํ๋ฉด ๋ฉ์ถ๋ ํํ์ count ์ ๋๋ฉ์ด์์ ๊ตฌํํ๋ค.
์ด๊ฒ๋ง์ผ๋ก๋ ํฐ ๋ถ์กฑํจ์ ์์ง๋ง, ์กฐ๊ธ ๋ ์๋๊ฐ์ ์ฃผ๊ธฐ ์ํด ์ฆ๊ฐ ์๋๋ฅผ ์กฐ์ ํด๋ณด์.

## 2. easeOutExpo๋ก Count ์๋ ์กฐ์ ํ๊ธฐ

์ ๋๋ฉ์ด์ ์๋๋ฅผ ์กฐ์ ํ๊ธฐ ์ํด์ ์๊ฐ ํ๋ฆ์ ๋ฐ๋ผ ๋ณํ์จ์ ๋ณ๊ฒฝํ  ์ ์๋ Easing ํจ์๋ฅผ ์ด์ฉํ๋ค.
์๋์ฒ๋ผ ๋ค์ํ ์ข๋ฅ๊ฐ ์๊ณ , ๊ทธ๋ํ๋ ์๊ฐ์ ๋ฐ๋ฅธ ๋ณํ์จ์ ๋ํ๋ธ๋ค.

![count-img-3.png](./count-img-3.png)


์ด ๋ง์ ์ ํ์ง ์ค ์ฌ์ฉํ  ํจ์๋ easeOutExpo !

![count-img-4.png](./count-img-4.png)

์ ๊ทธ๋ํ์์ t๋ ์๊ฐ, x๋ ์์ง์ ์์์ธ 0๋ถํฐ ์์ง์ ๋์ธ 1 ์ฌ์ด์ ์ง์ฒ๋ฅ ์ ๋ปํ๋ค. <br/>
์ฝ๋๋ก ๋ํ๋ด๋ฉด ์๋์ ๊ฐ๋ค.

```javascript
function easeOutExpo(x: number): number {
	return x === 1 ? 1 : 1 - pow(2, -10 * x);
}
```

### ๊ตฌํ ์ฝ๋

```javascript
/** ์งํ๋ฅ ์ ๋ฐ๋ผ count ์๋ ์กฐ์  */
const easeOutExpo = (t: number) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/** ์ ์ฐจ ๋๋ ค์ง๋ count up ํจ์ */
const useCountUp = (num: number, duration: number) => {
  const [count, setCount] = useState(0)
  const frameRate = 1000 / 60
  const totalFrame = Math.round(duration / frameRate)

  useEffect(() => {
    let currentNumber = 0
    const counter = setInterval(() => {
      const progressRate = easeOutExpo(++currentNumber / totalFrame)
      setCount(Math.round(num * progressRate))

      // ์งํ ์๋ฃ์ interval ํด์ 
      if (progressRate === 1) {
        clearInterval(counter)
      }
    }, frameRate)
  }, [])

  return count
}
```

์ต์๋จ์ ์ถ๊ฐ๋ easeOutExpo ํจ์์ ์ํด ์ ๋๋ฉ์ด์ ์๋๋ ์ ์ฐจ ์ค์ด๋ค๊ฒ ๋๋ค. <br/>
easeOutExpo ํจ์์ ๋งค๊ฐ๋ณ์๋ ์ง์ฒ๋ฅ ์ ๋ํ๋ด๊ธฐ ๋๋ฌธ์ `useCountUp`์์ ์ง์ฒ๋ฅ ๋ก ์ ์ํด๋ ๋ณ์ `progressRate`์ ์ ๋ฌํด์ค๋ค.

### ๊ฒฐ๊ณผ ํ๋ฉด
![count-img-1.gif](./count-img-1.gif)


setInterval๋ก ๊ธฐ๋ณธ count ์ ๋๋ฉ์ด์์ ๊ตฌํํ๋ ์๋๋ easing ํจ์๋ฅผ ํ์ฉํ๋ ๊ฒ์ด ํต์ฌ์ด์๋ค.
๋ ํจ์๋ฅผ ์ฌ์ฉํ  ๋๋ฟ๋ง ์๋๋ผ ์ดํ ๋ค๋ฅธ easing ํจ์๋ฅผ ์ฌ์ฉํ๋๋ผ๋ ์ ๋๋ก ์ดํดํ๊ณ  ์์ด์ผํ๋ ๊ฐ๋์ ์ง์ฒ๋ฅ .

๊ฒฐ๊ตญ ๋ชจ๋  ์ ๋๋ฉ์ด์์ ์์ง์์ ์์์ธ 0 ๋ถํฐ ๋์ธ 1๊น์ง์ ์ง์ฒ๋ฅ ์ ๋ฐ๋ผ ๊ทธ ์๋๋ฅผ ์กฐ์ ํ  ์ ์๋ค๋ ๊ฑธ ๋ช์ฌํ์.

### ์ฐธ๊ณ  ์๋ฃ

<a target="_blank" href="https://shylog.com/react-custom-hooks-scroll-animation-countup/">
React Custom Hooks๋ก scroll animation ๋ง๋ค๊ธฐ CountUpํธ</a> <br/>
<a target="_blank" href="https://velog.io/@y_jem/react-%EC%8A%AC%EB%A1%AF-%EC%B9%B4%EC%9A%B4%ED%8A%B8-%EA%B8%B0%EB%8A%A5">
[react] ์ฌ๋กฏ ์นด์ดํธ ๊ธฐ๋ฅ ๊ตฌํ (๋ผ์ด๋ธ๋ฌ๋ฆฌ x)</a> <br/>
<a target="_blank" href="https://easings.net/ko#">Easing ํจ์ ์นํธ</a> <br/>
<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/Performance/Animation_performance_and_frame_rate">
Animation performance and frame rate</a>

```toc
```