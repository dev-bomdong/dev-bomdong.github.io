---
emoji: ๐
title: React Portal์ ์ด์ฉํ Modal ๊ตฌํํ๊ธฐ
date: '2021-11-05'
author: Bomdong
tags: Portal React
categories: React
---

![portal-img_1.png](./portal-img_1.png)
<br/>
ํ๊ตญ์ธ์๊ฒ portal์ด๋.. ๋ฅํฐ์คํธ๋ ์ธ์ง์ ๋ง๋ฒ์ง๊ฐ์ ํฌํ๋ง ๋ ์ค๋ฅผ ์ ์๋ค. <br/>
์ด๋ฏธ ์ถฉ๋ถํ ์ต์ํ ๋ค๋ฅธ ๊ณณ์ผ๋ก ์ด๋์ํจ๋ค๋ ๊ฐ๋์ ์ด์ด๋ฐ์ <br/>
์ปดํฌ๋ํธ๋ฅผ ๋ถ๋ชจ ์ปดํฌ๋ํธ์ ๋ฐ๊นฅ์ ๋ ๋๋งํด์ฃผ๋ ์ ๊ธฐํ portal์ ์์๋ณด์.

## Portal์ด๋
React ๊ณต์ ๋ฌธ์์ ๋ฐ๋ฅด๋ฉด, Portal์ ๋ถ๋ชจ ์ปดํฌ๋ํธ์ DOM ๊ณ์ธต ๊ตฌ์กฐ ๋ฐ๊นฅ์ ์๋ DOM ๋ธ๋๋ก<br/>
์์์ ๋ ๋๋งํ๋ ์ต๊ณ ์ ๋ฐฉ๋ฒ์ด๋ค. '๋ถ๋ชจ ์ปดํฌ๋ํธ์ DOM ๊ณ์ธต ๊ตฌ์กฐ ๋ฐ๊นฅ์ ์๋ DOM ๋ธ๋' ๋ผ๋ ํํ์ ์์๋ฅผ ๋ค์ด๋ณด์๋ฉด,
<br/>

![portal-img_2.png](./portal-img_2.png)

ํ์ฌ `<div id="root">`์ `<div id="modal">`์ ํ์  ๊ด๊ณ์ฒ๋ผ ๋ณด์ด์ง๋ง <br/>
์ค์ ๋ก modal์ root ์์์ ๋ณด์ฌ์ง๋ ์์ ์ปดํฌ๋ํธ์ด๊ณ , ๋ ๋๋ง๋ง root์ ๋ฐ๊นฅ์์ ์ด๋ฃจ์ด์ง๊ณ  ์๋ค. <br/>
์ด๋์ modal์ ๋ถ๋ชจ ์ปดํฌ๋ํธ(root)์ DOM ๊ณ์ธต ๊ตฌ์กฐ ๋ฐ๊นฅ์ ์๋ DOM ๋ธ๋๋ผ๊ณ  ํ  ์ ์๋ค.

react๋ ๋ถ๋ชจ ์ปดํฌ๋ํธ๊ฐ ๋ ๋๋ง๋๋ฉด ์์ ์ปดํฌ๋ํธ๊ฐ ๋ ๋๋ง๋๋ tree ๊ตฌ์กฐ๋ฅผ ๊ฐ์ง๊ณ  ์๋๋ฐ <br/>
์ด๋ฐ tree๊ตฌ์กฐ๋ ์ข์ข ๋ถํธํจ์ ๊ฐ์ ธ๋ค์ฃผ๊ธฐ๋ ํ๋ค. ๋ํ์ ์ธ ์๋ก ํน์  ์ปดํฌ๋ํธ์ ์์ ์ปดํฌ๋ํธ๋ก modal์ด ๋ ๋๋ง๋  ๊ฒฝ์ฐ,๋ถ๋ชจ ์ปดํฌ๋ํธ์ ์คํ์ผ๋ง ์์ฑ์ ์ ์ฝ์ ๋ฐ์ z-index ๋ฑ์ผ๋ก ๋ฒ๊ฑฐ๋ก์ด ํ์ฒ๋ฆฌ๋ฅผ ํด์ค์ผํ๋ค.

์ด๋ด ๋ ๋ถ๋ชจ-์์ ๊ด๊ณ๋ฅผ ์ ์งํ์ง๋ง ๋๋ฆฝ์ ์ธ ์์น์์ ๋ ๋๋ง์ ํ๋ฉด ํจ์ฌ ํธ๋ฆฌํ๋ฐ ๊ทธ๊ฑธ Portal์ด ํด๋๋๋ค. <br/>
๋๋ฆฝ์ ์ธ ๊ตฌ์กฐ์ ๋ถ๋ชจ-์์ ๊ด๊ณ๋ฅผ ๋์์ ์ ์งํด ๋ถ๋ชจ ์ปดํฌ๋ํธ์ ์ ์ฝ์์ ๋ฒ์ด๋  ์ ์๋ค.

## ๊ตฌํ ๋ฐฉ๋ฒ
portal์ ํตํด modal์ ๊ตฌํํ๋ ๋ฐฉ๋ฒ์ ์์๋ณด์. (๋ถํ์ํ ์ฝ๋๋ ์ค๊ฐ ์๋ต)

### 1. Modal์ด ๋ ๋๋ง ๋  ์์น ์ฌ์ด์ฃผ๊ธฐ
```html
<body>
    <div id="root"></div>
    <div id="modal"></div>
  </body>
```

public/index.html์ portal์ ๊ตฌํํ  tree์ ๋ถ๋ชจ ์ปดํฌ๋ํธ๋ฅผ ์ค์ ํ๋ค. <br/>
์ ์ฝ๋์์  ๊ธฐ์กด ์ต์๋จ ์์์ธ root์ ํ์ ๊ด๊ณ๋ก modal ์์๋ฅผ ๋ฃ์๋๋ฐ <br/>
์ด ์์์์ modal ์ปดํฌ๋ํธ๊ฐ ๋ ๋๋ง๋๋๋ก ๋ง๋ค ์์ !


### 2. Portal.js ๋ง๋ค๊ธฐ
```javascript
//Portal.js

import reactDom from "react-dom";

const ModalPortal = ({ children }) => {
    const el = document.getElementById("modal");
    return reactDom.createPortal(children, el);
};

export default ModalPortal;
```

Portal ์ญํ ์ ํ  Portal.js๋ฅผ ๋ง๋ค์ด์ค๋ค. 


### 3. Modal.js ๋ง๋ค๊ธฐ

```javascript
//Modal.js

import React from "react";
import styled from "styled-components";

const Modal = ({ onClose}) => {

  return (
      <Background>
        <Content>
  //  ... modal ์์ contents ์ฝ๋ ...
         </ Content>
      </Background>
  );
};

export default Modal;

//์๋๋ styled-components๋ฅผ ํตํ ์คํ์ผ๋ง

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
`;

const Content = styled.div`
  height: 100%;
  width: 950px;
  margin-top: 70px;
  position: relative;
  overflow: scroll;
  background: #141414;
`;
```

portal์ ํตํด ๋ ๋๋ง์์ผ์ค modal.js๋ฅผ ๋ง๋ค์ด์ค๋ค. <br/>
์ด ๋ modal์ ๋ท๋ฐฐ๊ฒฝ์ด ๋  ๋ถ๋ถ์ <Background>, modal์ <Content>๋ก styled-component ํํ๋ก ์ ์ํด๋์๋ค.


### 4. Modal์ ๋์ธ ์ปดํฌ๋ํธ์ Portal, Modal ์กฐ๊ฑด๋ถ ๋ ๋๋ง
````javascript
//modal์ ๋์ฐ๋ ค๋ ์ปดํฌ๋ํธ ํ์ผ

import styled from "styled-components";
import ModalPortal from "../Components/Modal/Portal";
import Modal from "./Modal/Modal";

const Carousel = props => {
  const [isModalOn, setIsModalOn] = useState(false);

  const handleModal = () => {
      setIsModalOn(!isModalOn);
  };
  
  return (
    <>
      <Container>
    	<button onClick={handleModal}/>
		// ... ์ฝ๋ ์๋ต ...
        <ModalPortal>
          {isModalOn && <Modal onClose={handleModal} />}
        </ModalPortal>
      </Container>
    </>
  );
};

export default Carousel;
````

modal์ ๋ ๋๋งํ๊ณ ์ ํ๋ ํ์ผ์์ Portal์ ๊ฐ์ธ์ง ํํ๋ก modal์ ๋ฃ์ด์ฃผ๊ณ , <br/>
isModalOn์ด๋ผ๋ state๋ก ์กฐ๊ฑด๋ถ ๋ ๋๋ง๋๋๋ก ๋ง๋ฌด๋ฆฌ!

## ์ฐธ๊ณ  ์๋ฃ
<a href="https://ko.reactjs.org/docs/portals.html">React ๊ณต์ ๋ฌธ์ - Portals</a> <br/>
<a href="https://blog.bitsrc.io/understanding-react-portals-ab79827732c7">Understanding React Portals and Its Use-Cases - blog.bitsrc.io๏ปฟ</a> <br/>
<a href="https://yunsuu.github.io/portal/">Portal - yunsuu.github.io</a>

```toc
```