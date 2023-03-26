---
emoji: 🚀
title: 함수형 프로그래밍 | 액션 리팩토링하기
date: '2023-03-26'
author: Bomdong
tags: Web
categories: Web
---

> 본 글은 [쏙쏙 들어오는 함수형 코딩 - 에릭 노먼드](http://www.yes24.com/Product/Goods/108748841) 저서를 읽고 학습한 내용을 정리한 글입니다.

## 들어가며
[이전 글](http://localhost:8000/functional-programming-concept/)에서 
액션과 계산, 데이터의 개념에 대해 알아보았다면, 이번 포스팅은 실습시간! <br/>
여러 예제로 상세히 알아본 개념을 활용해 리팩토링을 해보자.  <br/>


### 함수의 입출력
액션에서 계산을 빼내기 위해선 우선 어떠한 함수를 액션 혹은 계산으로 구분할 줄 알아야한다. <br/>
이를 위해선 함수의 입출력에 대한 이해가 필요하다.

모든 함수에는 입력과 출력이 존재한다. **입력**은 함수가 동작하기 위해 외부에서 유입되는 정보, **출력**은 함수의 결과로 나오는 정보/또다른 동작을 뜻한다.
함수의 입출력은 아래와 같이 명시적이거나 암묵적인 속성을 가진다.


|     | 입력         | 출력          |
|-----|------------|-------------|
| 명시적 | 인자         | 리턴값         |
| 암묵적 | 인자 외 다른 입력 | 리턴값 외 다른 출력 |


여기서 기억해야 할 것은, **함수가 암묵적 입출력을 가지면 액션, 명시적 입출력을 가지면 계산이 된다.** <br/>
또, 어떠한 함수가 액션을 포함한다면 그 함수 전체는 액션이 된다.
따라서 액션 함수를 계산 함수로 만들려면 암묵적인 입출력을 찾아 명시적으로 변경해야 한다.


함수에는 보통 인자와 리턴값이 있으니까 대부분의 함수는 명시적 입출력을 가지겠군~ 생각할 수도 있다. (본인 경험담)
하지만 과연 그럴까 🤔 아래의 예시를 살펴보자.


```javascript
let totalPrice = 0; //전역변수

const addToTotalPrice = (price) => {
  totalPrice += price;
  return totalPrice;
}
```

`addToTotalPrice` 함수는 액션일까 계산일까?

인자 `price`와 리턴값 `totalPrice`를 가지고 있으므로 명시적 입출력을 가지는구나, 이건 계산이다! 생각할 수 있다.
하지만 아래의 표를 보면 숨어있던 암묵적 입출력을 발견하게 된다.

|     | 입력                                  | 출력                           |
|-----|-------------------------------------|------------------------------|
| 명시적 | `price`                             | `total`                      |
| 암묵적 | `totalPrice += price` <br/> 전역변수 읽기 | `totalPrice += price` <br/> 전역변수 변경 |

전역변수를 읽고 변경하는 부분도 암묵적 입출력에 해당하기 때문에 결국 `addToTotalPrice` 함수는 계산이 아닌 액션 함수로 분류된다.


## 액션에서 계산 빼내기
이제 액션 함수에서 계산 함수를 분리하는 리팩토링을 아래의 예제 코드와 함께 단계별로 진행해보자. 
아래 함수는 유저의 주문에 따라 총 주문금액과 배송비를 계산하는 로직이 담겨있다.

```typescript
// 전역변수 - 추후 orderList에 타입에 맞는 데이터가 추가되는 것으로 가정
let totalPrice = 0;
let orderList: Array<{name:string, price:number}> = []; 

// 총 주문금액 및 배송비 계산
const handleTotalOrder = () => {
    totalPrice = 0;
    orderList.map((item) => {
        totalPrice += item.price;
    })
    changeShippingFee(); //배송비를 계산하는 별도의 함수
}
```


### 1. 함수를 액션, 계산, 데이터로 구분하기

```javascript
    totalPrice = 0;
    orderList.map((item) => {
        totalPrice += item.price;
    })
```

`handleTotalOrder` 함수는 전역변수 orderList를 읽고(암묵적 입력), 또다른 전역변수 totalPrice를 변경하고 있으므로(암묵적 출력) 액션으로 분류된다.


### 2. 계산하는 부분 찾아 분리하기 (서브루틴 추출)

```javascript
const calculateTotalPrice = () => {
  totalPrice = 0;
  orderList.map((item) => {
    totalPrice += item.price;
  })
}

const handleTotalOrder = () => {
  calculateTotalPrice(); //총 주문금액 계산
  changeShippingFee(); //배송비를 계산하는 별도의 함수
}
```

기존 코드에서 총 주문 금액을 계산하는 부분을 찾아 분리했다.
이 단계만으로 액션 함수가 계산 함수로 변하지는 않는다. 암묵적 입출력을 가지고있는 함수 `calculateTotalPrice`, `handleTotalOrder` 모두 액션인 상태.


### 3. 분리한 함수에서 암묵적 입출력 찾기

```javascript
const calculateTotalPrice = () => {
  totalPrice = 0; //암묵적 출력
  orderList.map((item) => { //암묵적 입력
    totalPrice += item.price; //암묵적 출력
  })
}
```

주석으로도 표시해두었지만, 분리한 함수 `calculateTotalPrice`의 암묵적 입출력은 다음과 같다.


  |     | 암묵적                | 
  |------|---------------------|
  | 입력  | 전역변수 orderList 읽음  |
  | 출력  | 전역변수 totalPrice 변경 |


### 4. 암묵적 입출력 명시적으로 바꾸기

```javascript
const calculateTotalPrice = (orderList) => {
    const totalPrice = 0; 
    orderList.map((item) => {
        totalPrice += item.price;
    });
    return total;
}

const handleTotalOrder = () => {
    calculateTotalPrice(orderList); //총 주문금액 계산 함수
    changeShippingFee(); //배송비를 계산하는 별도의 함수
}
```

아래 표와 같이 `calculateTotalPrice` 함수의 암묵적 입출력을 명시적 입출력으로 변경해 계산으로 변경했다.

|     | 변경 전 (암묵적)         | 변경 후 (명시적)            |
|-----|--------------------|-----------------------|
| 입력  | 전역변수 orderList 읽음  | 인자 orderList 읽음       |
| 출력  | 전역변수 totalPrice 변경 | 지역변수 totalPrice 변경 후 리턴 |

`handleTotalOrder` 함수는 1)총 주문금액 계산 함수와 2)배송비 계산 함수의 조합으로 변경되었다.


<br/>

이렇게 액션과 계산이 섞여있던 함수에서 계산 로직을 분리해내 별도의 함수로 만들어봤다. <br/>
리팩토링을 통해 하나의 함수가 더 작은 단위의 함수 두 개로 쪼개졌고, 이는 테스트와 재사용 그리고 유지보수에 더 유리해졌다. 

## 마무리

앞서 진행한 액션에서 계산을 빼내는 리팩토링은 안타깝지만 모든 액션에 적용할 수는 없다. <br/>
> 모든 액션에 적용한다면 데이터와 계산만 남게될텐데, 데이터와 계산만으로 프로그래밍한다는 것은 순수함수로만 프로그래밍을 한다는 것과 비슷한 이야기일테니 🫥

따라서 아래 사항을 전제로, 액션에서 빼낼 수 있는 계산은 분리하되 남아있는 액션은 더 좋은 액션으로 만들어야 한다.

- 모든 액션을 계산으로 바꿀 수는 없다.
- 액션과 계산을 분리해 액션을 최소화하고, 계산을 늘리는 것을 목표로 한다.
- 남아있는 액션에서 암묵적 입출력을 최소화한다.


```toc
```