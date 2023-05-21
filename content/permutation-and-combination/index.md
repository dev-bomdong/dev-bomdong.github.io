---
emoji: 🧺
title: '순열과 조합 Javascript로 구현하기'
date: '2023-05-21'
author: Bomdong
tags: Algorithm
categories: Algorithm
---

## 들어가며
알고리즘 스터디 중 많은 혼선을 겪었던 DFS, 그 중 응용되는 범위가 넓은 만큼 헷갈리기도 했던 순열과 조합 파트를 정리해본다. <br/>

>` DFS(Depth-First Search, 깊이 우선 탐색)` <br/>
> 한 경로를 따라 가능한만큼 멀리까지 탐색하고, 더 이상 갈 곳이 없을 때 되돌아와 다른 경로로 탐색을 진행하는 방식.


## 순열 (Permutation)

### 정의

주어진 요소들을 나열하는 모든 **순서**를 구하는 것. 서로 다른 n개에서 r개를 고르는 순열은 nPr로 표기한다. <br/>
요소의 순서가 다르면 다른 경우로 취급하기 때문에 `1,2`과 `2,1`같이 같은 요소라도 다른 순서이면 별개의 경우로 취급한다.

### 구현
DFS를 활용해 순열을 구현할 땐 아래의 단계를 따른다.

1. 재귀 함수를 사용해 DFS를 구현한다.

2. 순열을 구하는 함수는 탐색할 배열과 주어진 순열의 길이를 매개변수로 받는다.

3. DFS 함수에서 현재까지 구한 순열의 길이가 주어진 값과 같을 때 : 구한 순열을 저장하고 탐색을 종료한다.

4. DFS 함수에서 현재까지 구한 순열의 길이가 주어진 값과 다를 때 : (아직 사용하지않은 요소라면 해당 요소에 check를 하고) 재귀로 DFS를 호출한다. DFS 호출이 끝난 후엔 check를 해제한다.


여러 과일이 나열된 아래의 배열에서 두 개의 과일을 뽑는 순열을 구해보자.

```jsx
const fruits = ['🍎', '🍌', '🍍', '🍈'];
```

#### 코드

```javascript
const getPermutation = (r, arr) => {
  const n = arr.length; //4
  let checkArr = Array.from({length: n}, () => 0); //[0,0,0,0]
  let caseArr = Array.from({length: r}, () => 0); //[0,0]
  let answer = [];
  
  const DFS = (L) => {
    if(L===r){ // 현재까지 구한 순열의 길이가 주어진 값과 같을 때
      answer.push(caseArr.slice());
    } else { // 현재까지 구한 순열의 길이가 주어진 값과 다를 때
      for(let i=0; i<n; i++){
        if(checkArr[i]===0) {
          checkArr[i]=1; 
          caseArr[L]=arr[i];
          DFS(L+1);
          checkArr[i]=0;
        }
      }
    }
  }
  DFS(0);
  return answer;
}
```

`getPermutation` 함수는 `DFS` 함수를 호출한다. 

이 `DFS` 함수는 현재까지 구한 순열의 길이가 주어진 값과 같을 때 배열 `answer`에 순열을 저장한다.

주어진 값과 다를 땐 주어진 배열을 순회하며 1) 순회하는 요소의 사용 여부를 check한 뒤 2) 순열에 저장하고 3) 순열의 길이를 +1해 `DFS`를 재귀로 호출하고 4) 호출 후엔 check를 해제한다. <br/>

각 요소의 사용 여부는 배열 `checkArr`에 관리한다.


```javascript
const fruits = ['🍎', '🍌', '🍍', '🍈'];
getPermutation(2, fruits);

[
  [ '🍎', '🍌' ], [ '🍎', '🍍' ],
  [ '🍎', '🍈' ], [ '🍌', '🍎' ],
  [ '🍌', '🍍' ], [ '🍌', '🍈' ],
  [ '🍍', '🍎' ], [ '🍍', '🍌' ],
  [ '🍍', '🍈' ], [ '🍈', '🍎' ],
  [ '🍈', '🍌' ], [ '🍈', '🍍' ]
]
```
같은 과일이라도 순서가 다르면 다른 값으로 인식해 총 12가지의 순서가 리턴된다.

## 조합 (Combination)

### 정의

서로 다른 n개에서 순서와 상관없이 r개를 고르는 것. nCr로 표기한다.
순열과의 차이는 순서가 중요하지 않다는 것. `1,2`과 `2,1`은 순열에선 각각 별개의 경우로 취급되었지만, 조합에선 동일한 경우로 취급된다.

### 구현

DFS를 활용해 순열을 구현할 땐 아래의 단계를 따른다.

1. 재귀 함수를 사용해 DFS를 구현한다.

2. 조합을 구하는 함수는 탐색할 배열과 구할 조합의 크기를 매개변수로 받는다.

3. DFS 함수에서 현재까지 구한 요소들의 길이가 주어진 조합 크기와 같을 때 : 구한 조합을 저장하고 탐색을 종료한다.

4. DFS 함수에서 현재까지 구한 요소들의 길이가 주어진 조합 크기와 다를 때 : 재귀로 DFS를 호출한다.


순열과 동일한 예시로, 아래의 배열에서 과일 두 개를 뽑는다고 해보자.

```jsx
const fruits = ['🍎', '🍌', '🍍', '🍈'];
```

#### 코드

```javascript
const getCombination = (arr, r) => {
    const result = [];

    const DFS = (currComb, start) => {
        if (currComb.length === r) {
            return result.push(currComb.slice());
        }

        for (let i = start; i < arr.length; i++) {
            currComb.push(arr[i]);
            DFS(currComb, i + 1);
            currComb.pop();
        }
    }

    DFS([], 0);
    return result;
}
```
`getCombination` 함수는 `DFS` 함수를 호출한다.

이 `DFS` 함수는 현재까지 선택한 조합인 `currComb` 배열과 순회시작 index `start`를 매개변수로 받는다.
`currComb`의 길이가 r과 같으면 조합을 구한 것이므로 배열 `result`에 저장한다.

주어진 값과 다를 땐 배열에서 start부터 n번째 값을 순회하며 1) 순회하는 요소를 현재 조합배열인 `currComb` 배열에 저장하고 2) 배열의 다음 요소를 순회하기 위해 순회 순서를 +1해 DFS를 호출한다. 3) currComb를 pop해서 갱신한다.



```javascript

const fruits = ['🍎', '🍌', '🍍', '🍈'];
getCombination(fruits, 2);

// [
//   [ '🍎', '🍌' ],
//   [ '🍎', '🍍' ],
//   [ '🍎', '🍈' ],
//   [ '🍌', '🍍' ],
//   [ '🍌', '🍈' ],
//   [ '🍍', '🍈' ]
// ]
```

다른 순서라도 요소가 같으면 동일한 경우로 취급되기 때문에 순열의 절반인 6가지가 리턴된다.

```toc
```