---
emoji: 🪆
title: '[번역] Compound Pattern'
date: '2024-03-03'
author: Bomdong
tags: React
categories: React
---

> 본 글은 원글 [patterns - Compound Pattern](https://www.patterns.dev/react/compound-pattern)을 학습용으로 번역한 것입니다.

## 들어가며

`패턴은 내 코드를 공용어로 만든다`라는 문장에 깊은 감명을 받았던 최근.. patterns에 정리된 패턴 하나하나를 뽀개보려 한다. 원문 자체가 단순한 영문으로 이루어져 있지만 이해한 후 다시한번 정리해내는 경험 또한 유익할거란 생각. 첫 주자는 `Compound pattern`!

---

# Compound Pattern

우리의 애플리케이션엔 종종 서로 관련된 컴포넌트들이 있습니다. 이것들은 공유된 상태를 통해 서로 의존하고, 로직을 공유합니다. 이는 select, dropdown, menu item과 같은 컴포넌트에서 자주 볼 수 있습니다. **compound component pattern**을 사용하면 특정 작업을 수행하기 위해 함께 작동하는 컴포넌트를 만들 수 있습니다.

## Context API

예를 들어봅시다: 우리는 다람쥐 사진 목록이 있습니다!
단순히 다람쥐 사진을 보는 것을 넘어서, 우리는 유저가 사진을 수정하거나 삭제하는 버튼을 추가하고자 합니다. 이를 위해 우리는 유저가 토글할 때 목록을 보여주는 `FlyOut` 컴포넌트를 구현할 수 있습니다.

`FlyOut` 컴포넌트에는 아래의 세가지가 있습니다.

- Toggle 버튼과 List를 포함하는 `Flyout` wrapper
- `List`를 토글하는 `Toggle` 버튼
- 메뉴 아이템의 목록을 담고있는 `List`

이 예시에 React Context API와 함께 Compound component pattern을 사용하는 건 완벽합니다!

첫 번째로, `FlyOut` 컴포넌트를 만들어봅시다. <br/>
이 컴포넌트는 상태를 가지고, 모든 자식 컴포넌트에게 토글 값을 가진 `FlyOutProvider` 를 리턴합니다.

```typescript
const FlyOutContext = createContext();

function FlyOut(props) {
  const [open, toggle] = useState(false);

  return <FlyOutContext.Provider value={{ open, toggle }}>{props.children}</FlyOutContext.Provider>;
}
```

우리는 이제 open과 toggle 값을 전달할 수 있는 상태를 가진 `FlyOut` 컴포넌트를 가지게 되었습니다!

이제 `Toggle` 컴포넌트를 만들어봅시다. <br/>
이 컴포넌트는 사용자가 메뉴를 토글하기 위해 클릭할 수 있는 컴포넌트를 단순히 렌더링합니다.

```typescript
function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);

  return (
    <div onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}
```

`Toggle` 컴포넌트가 FlyOutContext provider에 접근할 수 있게 하려면, `Flyout`의 자식 컴포넌트로 렌더링해야합니다! 우리는 단순히 이를 자식 컴포넌트로 렌더할 수 있지만, `Toggle`컴포넌트를 `Flyout` 컴포넌트의 속성으로 만들 수도 있습니다!

```typescript
const FlyOutContext = createContext();

function FlyOut(props) {
  const [open, toggle] = useState(false);

  return <FlyOutContext.Provider value={{ open, toggle }}>{props.children}</FlyOutContext.Provider>;
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);

  return (
    <div onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

FlyOut.Toggle = Toggle;
```

이것은 우리가 어느 파일에서든 `FlyOut` 컴포넌트를 사용하고자 할 때, 단지 `FlyOut`만 import하면 된다는 것을 의미합니다!

```typescript
import React from 'react';
import { FlyOut } from './FlyOut';

export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
    </FlyOut>
  );
}
```

toggle만으로는 충분하지 않습니다. <br/>
우리는 open 상태값에 따라 열고 닫히는 list item을 가진 `List`가 필요합니다.

```typescript
function List({ children }) {
  const { open } = React.useContext(FlyOutContext);
  return open && <ul>{children}</ul>;
}

function Item({ children }) {
  return <li>{children}</li>;
}
```

`List` 컴포넌트는 open 상태가 true, false인지에 따라 렌더됩니다. `List`와 `Item` 을 `FlyOut` 컴포넌트의 속성으로 만들어 봅시다. 우리가 `Toggle` 컴포넌트를 다룬 것처럼요.

```typescript
const FlyOutContext = createContext();

function FlyOut(props) {
  const [open, toggle] = useState(false);

  return <FlyOutContext.Provider value={{ open, toggle }}>{props.children}</FlyOutContext.Provider>;
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);

  return (
    <div onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

function List({ children }) {
  const { open } = useContext(FlyOutContext);
  return open && <ul>{children}</ul>;
}

function Item({ children }) {
  return <li>{children}</li>;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;
```

우리는 이제 `Flyout` 컴포넌트의 속성으로 Toggle과 List를 사용할 수 있습니다! 여기서 우리는 사용자들에게 **편집**과 **삭제**옵션을 보여주고자 합니다.
하나는 수정 옵션, 다른 하나는 삭제 옵션인 `FlyOut.Item` 컴포넌트를 렌더하는 `FlyOut.List` 를 만들어봅시다.

```typescript
import React from 'react';
import { FlyOut } from './FlyOut';

export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
```

완벽합니다!
우리는 `FlyOutMenu`에 어떠한 상태를 추가하지 않고 완전한 `FlyOut` 컴포넌트를 만들었습니다.

compound pattern은 컴포넌트 라이브러리를 만들 때 유용합니다.
[Semantic UI](https://react.semantic-ui.com/modules/dropdown/#types-dropdown)와 같은 UI 라이브러리에서 이런 패턴을 종종 볼 수 있습니다.

---

## React.Children.map

우리는 컴포넌트의 자식을 매핑하면서 compound component pattern을 구현할 수도 있습니다. 우리는 이 요소들에게 추가적인 props와 함께 [clone을 생성](https://react.dev/reference/react/cloneElement)함으로써 `open`, `toggle` 속성을 추가할 수 있습니다.

```typescript
export function FlyOut(props) {
  const [open, toggle] = React.useState(false);

  return (
    <div>
      {React.Children.map(props.children, (child) => React.cloneElement(child, { open, toggle }))}
    </div>
  );
}
```

모든 자식 컴포넌트들은 clone되고, `open` 과 `toggle` 값을 전달받습니다. 이전 예시에서 Context API를 사용해야 했던 것과 달리, 우리는 이제 `props`를 통해 이 두 값에 접근 가능합니다.

#### 적용예시

```typescript
import React from 'react';
import Icon from './Icon';

const FlyOutContext = React.createContext();

export function FlyOut(props) {
  const [open, toggle] = React.useState(false);

  return (
    <div>
      {React.Children.map(props.children, (child) => React.cloneElement(child, { open, toggle }))}
    </div>
  );
}

function Toggle() {
  const { open, toggle } = React.useContext(FlyOutContext);

  return (
    <div className="flyout-btn" onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

function List({ children }) {
  const { open } = React.useContext(FlyOutContext);
  return open && <ul className="flyout-list">{children}</ul>;
}

function Item({ children }) {
  return <li className="flyout-item">{children}</li>;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;
```

## 장점

Compound component는 자신의 내부 상태를 관리하며,이를 여러 자식 컴포넌트와 공유합니다. Compound component를 구현할 때 우리는 상태 관리에 대해 걱정할 필요가 없습니다.

compound component를 import할 때, 우리는 그 컴포넌트에서 사용 가능한 자식 컴포넌트를 명시적으로 import할 필요가 없습니다.

```typescript
import { FlyOut } from './FlyOut';

export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
```

## 단점

`React.Children.map`를 사용해 값을 제공할 때, 컴포넌트의 중첩이 제한됩니다. 부모 컴포넌트의 직접적인 자식만이 `open`, `toggle` 에 접근 가능한데, 이는 우리가 이 컴포넌트들을 다른 컴포넌트로 감쌀 수는 없음을 의미합니다.

```typescript
export default function FlyoutMenu() {
  return (
    <FlyOut>
      {/* This breaks */}
      <div>
        <FlyOut.Toggle />
        <FlyOut.List>
          <FlyOut.Item>Edit</FlyOut.Item>
          <FlyOut.Item>Delete</FlyOut.Item>
        </FlyOut.List>
      </div>
    </FlyOut>
  );
}
```

`React.Children.map`로 요소를 클로닝하는 것은 얕은 병합을 수행합니다. 이미 존재하는 props는 우리가 전달하는 새로운 props와 함께 병합됩니다. 만약 이미 존재하는 prop이 우리가 `React.Children.map` 메소드로 전달하는 prop과 동일한 이름을 가지고 있을 경우, 이름 충돌을 일으킬 수 있습니다. props가 얕게 병합되기에, 그 값은 우리가 전달하는 최신 값으로 덮어씌워지게 됩니다.

## 참고자료

[React Hooks: Compound Components - Kent C. Dodds](https://kentcdodds.com/blog/compound-components-with-react-hooks)

> 글을 다 작성한 시점에 [국문으로 번역된 별도의 사이트](https://patterns-dev-kr.github.io/)가 있음을 알았다..😇
> 다음 부터는 별도의 예시를 추가해보는 식으로 작성해보거나, 혹은 지금처럼 스스로 번역해보고 마지막에 참고차원에서 읽어보던가 해야겠다.

```toc

```
