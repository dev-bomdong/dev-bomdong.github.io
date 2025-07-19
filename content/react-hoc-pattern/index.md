---
emoji: 🪆
title: '[번역] HOC Pattern'
date: '2024-03-17'
author: Bomdong
tags: React
categories: '#React'
---

> 본 글은 원글 [patterns - HOC Pattern](https://www.patterns.dev/react/hoc-pattern)을 학습용으로 번역한 것입니다.

# 고차 컴포넌트 패턴

애플리케이션에서 여러 컴포넌트에 동일한 로직을 사용하고자 할 때가 있습니다. <br/>
이 로직에는 컴포넌트에 특정한 스타일링을 적용시키는 것, 권한 요구, 전역 상태룰 추가하는 것 등이 포함될 수 있습니다.

여러 컴포넌트에서 같은 로직을 재사용할 수 있도록 하는 방법 중 하나는 고차 컴포넌트 패턴을 사용하는 것입니다. <br/>
이 패턴으로 애플리케이션 전체에서 컴포넌트 로직을 재사용할 수 있습니다.

고차 컴포넌트(HOC)는 또다른 컴포넌트를 전달받는 컴포넌트입니다. <br/>
고차 컴포넌트는 매개변수로 전달하는 컴포넌트에 적용시키고자 하는 특정 로직을 포함하고 있습니다.
해당 로직을 적용한 후, 고차 컴포넌트는 추가적인 로직이 포함된 요소를 반환합니다.

애플리케이션에서 여러 컴포넌트에 특정한 스타일링을 추가하고 싶다고 가정해봅시다. <br/>
매번 로컬에서 style 객체를 만드는 대신, 전달하는 컴포넌트에 style 객체를 적용시키는 고차 컴포넌트를 만들 수 있습니다.

```javascript
function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```

Button, Text 컴포넌트를 StyledButton, StyledText 컴포넌트를 만들었습니다. <br/>
두 컴포넌트는 `withStyles` 고차 컴포넌트에 추가된 스타일을 포함하고 있습니다.

이전에 Container/Presentation 패턴에서 사용했던 `DogImages` 예시를 살펴보겠습니다!
이 애플리케이션은 API에서 받아온 `DogImages` 목록을 렌더링하는 것 외에는 아무것도 하지 않습니다.

사용자 경험을 조금 개선해 보겠습니다.
데이터를 가져올 때 사용자에게 "로딩 중..." 화면을 표시하고 싶습니다.
DogImages 컴포넌트에 데이터를 직접 추가하는 대신 해당 로직을 추가하는 고차 컴포넌트를 사용할 수 있습니다.

withLoader라는 고차 컴포넌트를 만들어봅시다.
고차 컴포넌트는 컴포넌트를 전달받고, 해당 컴포넌트를 반환해야합니다.
이 경우, withLoader 고차 컴포넌트는 데이터를 가져올 때까지 Loading...을 보여주는 요소를 전달받아야 합니다.

최소한을 구현한 withLoader 고차 컴포넌트를 만들어봅시다!

```javascript
function withLoader(Element) {
  return (props) => <Element />;
}
```

하지만 단순히 전달받은 요소를 반환하는 것을 원하지는 않습니다.
데이터가 로드되고 있는지를 알려주는 로직을 포함시키고자 합니다.

재사용성을 높이기 위해서, withLoader 고차 컴포넌트에 Dog API url을 하드코딩하지 않을 것입니다. 대신 url을 인수로 전달하면 API 엔드포인트에서 데이터를 가져오는동안 로딩 표시가 필요한 모든 컴포넌트에서 이 로더를 사용할 수 있습니다.

```javascript
function withLoader(Element, url) {
  return (props) => {};
}
```

고차 컴포넌트는 요소(이 경우 함수형 컴포넌트 `props => {}`)를 반환하며, 여기에 데이터가 아직 불러와지고 있을 때 Loading... 글씨를 보여주는 로직을 추가하려 합니다.
데이터를 불러오면 컴포넌트는 불러온 데이터를 prop으로 전달해야 합니다.

```javascript
import React, { useEffect, useState } from 'react';

export default function withLoader(Element, url) {
  return (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      }

      getData();
    }, []);

    if (!data) {
      return <div>Loading...</div>;
    }

    return <Element {...props} data={data} />;
  };
}
```

완벽합니다!
방금 모든 컴포넌트와 url을 전달받는 고차 컴포넌트를 만들었습니다.

1. useEffect 훅에서 `withLoader` 고차 컴포넌트는 `url` 값으로 전달한 API 엔드포인트에서 데이터를 가져옵니다.
   데이터가 아직 반환되지 않은 동안에는 Loading... 텍스트가 포함된 요소를 반환합니다.
2. 데이터를 가져온 후에는 가져온 데이터와 동일한 `data`를 설정합니다.
   `data`가 더 이상 null이 아니므로 고차 컴포넌트에 전달한 요소를 표시할 수 있습니다!

   그렇다면 어플리케이션에 이 동작을 추가해서 `DogImages` 목록에 로딩 중...을 표시하려면 어떻게 해야 할까요?

`DogImages.js`는 더 이상 일반 DogImages 컴포넌트를 반환하지 않습니다.
대신, DogImages 컴포넌트를 "래핑하는" `withLoading` 고차 컴포넌트를 반환하고자 합니다.

```javascript
export default withLoading(DogImages);
```

withLoader 고차 컴포넌트는 url이 어떤 엔드포인트에서 데이터를 가져오는지를 알기를 기대합니다.
이 경우 Dog API 엔드포인트를 추가하겠습니다.

```javascript
export default withLoader(DogImages, 'https://dog.ceo/api/breed/labrador/images/random/6');
```

이 경우 withLoader 고차 컴포넌트는 별도의 `data` prop인 `DogImages`가 포함된 요소를 반환하므로, `DogImages` 컴포넌트에서 `data` prop에 접근할 수 있습니다.

```javascript
import React from 'react';
import withLoader from './withLoader';

function DogImages(props) {
  return props.data.message.map((dog, index) => <img src={dog} alt="Dog" key={index} />);
}

export default withLoader(DogImages, 'https://dog.ceo/api/breed/labrador/images/random/6');
```

## 합성

여러 개의 고차 컴포넌트를 합성할 수도 있습니다.
사용자가 `DogImages` 목록 위로 마우스를 가져가면 Hovering! 텍스트 상자를 표시하는 기능을 추가한다고 가정해 봅시다.

전달할 요소에 `hovering` 프로퍼티를 제공하는 고차 컴포넌트를 만들어야 합니다. 이 프로퍼티를 기반으로 사용자가 `DogImages` 목록 위로 마우스를 가져갔는지 여부에 따라 텍스트 상자를 렌더링할 수 있습니다.

```javascript
import React, { useState } from 'react';

export default function withHover(Element) {
  return (props) => {
    const [hovering, setHover] = useState(false);

    return (
      <Element
        {...props}
        hovering={hovering}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    );
  };
}
```

이제 withHover 고차 컴포넌트를 withLoader 고차 컴포넌트에 래핑할 수 있습니다.

```javascript
import React from 'react';
import withLoader from './withLoader';
import withHover from './withHover';

function DogImages(props) {
  return (
    <div {...props}>
      {props.hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  );
}

export default withHover(
  withLoader(DogImages, 'https://dog.ceo/api/breed/labrador/images/random/6'),
);
```

이제 `DogImages` 요소에는 `withHover`와 withLoader에서 전달한 모든 프로퍼티가 포함됩니다.
호버링 프로퍼티의 값이 참인지 거짓인지에 따라 Hovering! 텍스트 상자를 조건부로 렌더링할 수 있습니다.

> 고차 컴포넌트를 작성하는 데 사용되는 잘 알려진 라이브러리는 [recompose](https://github.com/acdlite/recompose)입니다. 고차 컴포넌트는 대부분 React Hook으로 대체할 수 있기 때문에 recompose 라이브러리는 더 이상 유지되지 않으므로 이 글에서는 다루지 않겠습니다.

## Hooks

경우에 따라 고차 컴포넌트 패턴을 React Hook으로 대체할 수 있습니다.

`withHover` 고차 컴포넌트를 `useHover` 훅으로 대체해 보겠습니다. 고차 컴포넌트 대신 mouseOver와 mouseLeave 이벤트 리스너를 요소에 추가하는 훅을 내보냅니다. 고차 컴포넌트에서 했던 것처럼 더 이상 요소를 전달할 수 없습니다. 대신 mouseOver 및 mouseLeave 이벤트를 가져와야 하는 훅에서 ref를 반환합니다.

```javascript
import { useState, useRef, useEffect } from 'react';

export default function useHover() {
  const [hovering, setHover] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref.current]);

  return [ref, hovering];
}
```

useEffect 훅은 컴포넌트에 이벤트 리스너를 추가하고 사용자가 현재 요소 위에 마우스를 올려놓았는지 여부에 따라 hovering 값을 true 또는 false로 설정합니다. 마우스오버와 마우스리브 이벤트를 수신해야 하는 컴포넌트에 참조를 추가하려면 참조와 호버링 값을 모두 반환해야 하며, 조건부로 호버링! 텍스트 상자를 렌더링할 수 있도록 하려면 호버링 값을 반환해야 합니다.

도그이미지 컴포넌트를 withHover 고차 컴포넌트로 감싸는 대신, 도그이미지 컴포넌트 내부에서 바로 useHover 훅을 사용할 수 있습니다.

```javascript
import React from 'react';
import withLoader from './withLoader';
import useHover from './useHover';

function DogImages(props) {
  const [hoverRef, hovering] = useHover();

  return (
    <div ref={hoverRef} {...props}>
      {hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  );
}

export default withLoader(DogImages, 'https://dog.ceo/api/breed/labrador/images/random/6');
```

완벽합니다! DogImages 컴포넌트를 withHover 컴포넌트로 감싸는 대신, 컴포넌트 내에서 직접 useHover 훅을 사용할 수 있습니다.

일반적으로 React Hook은 고차 컴포넌트 패턴을 대체하지 않습니다.

"대부분의 경우 Hook으로 충분하며 트리에서 중첩을 줄이는 데 도움이 될 수 있습니다." - React 문서

React 문서에 따르면 Hook을 사용하면 컴포넌트 트리의 깊이를 줄일 수 있습니다. 고차 컴포넌트 패턴을 사용하면 컴포넌트 트리가 깊게 중첩되기 쉽습니다.

```javascript
<withAuth>
  <withLayout>
    <withLogging>
      <Component />
    </withLogging>
  </withLayout>
</withAuth>
```

컴포넌트에 Hook을 직접 추가하면 더 이상 컴포넌트를 래핑할 필요가 없습니다.

상위 컴포넌트를 사용하면 동일한 로직을 한 곳에 유지하면서 여러 컴포넌트에 동일한 로직을 제공할 수 있습니다. 후크를 사용하면 컴포넌트 내에서 사용자 정의 동작을 추가할 수 있으므로 여러 컴포넌트가 이 동작에 의존하는 경우 고차 컴포넌트 패턴에 비해 버그가 발생할 위험이 높아질 수 있습니다.

### 고차 컴포넌트의 모범 사용 사례:

애플리케이션 전체에서 여러 컴포넌트에서 사용자 정의되지 않은 동일한 동작을 사용해야 하는 경우.
컴포넌트는 사용자 정의 로직을 추가하지 않고 독립적으로 작동할 수 있습니다.

### Hook의 모범 사용 사례:

동작을 사용하는 각 컴포넌트에 대해 동작을 사용자 정의해야 합니다.
동작이 애플리케이션 전체에 퍼지지 않고 하나 또는 몇 개의 컴포넌트만 동작을 사용합니다.
이 동작은 컴포넌트에 많은 속성을 추가합니다.

## 사례 연구

고차 컴포넌트 패턴에 의존하던 일부 라이브러리는 릴리스 이후 Hook 지원을 추가했습니다. 그 좋은 예가 Apollo 클라이언트입니다.

이 예제를 이해하는 데 Apollo Client에 대한 경험이 없어도 됩니다.

Apollo Client를 사용하는 한 가지 방법은 graphql() 고차 컴포넌트를 사용하는 것입니다.

```javascript
import React from 'react';
import './styles.css';

import { graphql } from 'react-apollo';
import { ADD_MESSAGE } from './resolvers';

class Input extends React.Component {
  constructor() {
    super();
    this.state = { message: '' };
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleClick = () => {
    this.props.mutate({ variables: { message: this.state.message } });
  };

  render() {
    return (
      <div className="input-row">
        <input onChange={this.handleChange} type="text" placeholder="Type something..." />
        <button onClick={this.handleClick}>Add</button>
      </div>
    );
  }
}

export default graphql(ADD_MESSAGE)(Input);
```

graphql() 고차 컴포넌트를 사용하면 클라이언트의 데이터를 상위 컴포넌트에 의해 래핑된 컴포넌트에서 사용할 수 있게 만들 수 있습니다! 현재도 graphql() 고차 컴포넌트를 사용할 수 있지만, 몇 가지 단점이 있습니다.

컴포넌트가 여러 리졸버에 액세스해야 하는 경우, 이를 위해 여러 개의 graphql() 상위 컴포넌트를 작성해야 합니다. 여러 개의 고차 컴포넌트를 구성하면 데이터가 컴포넌트에 전달되는 방식을 이해하기 어려울 수 있습니다. 경우에 따라 고차 컴포넌트의 순서가 중요할 수 있으며, 이는 코드를 리팩토링할 때 쉽게 버그로 이어질 수 있습니다.

Hook이 출시된 후 Apollo는 Apollo 클라이언트 라이브러리에 Hook 지원을 추가했습니다. 이제 개발자는 graphql() 고차 컴포넌트를 사용하는 대신 라이브러리가 제공하는 후크를 통해 데이터에 직접 액세스할 수 있습니다.

앞서 예제에서 보았던 graphql() 고차 컴포넌트를 사용한 예제와 정확히 동일한 데이터를 사용하는 예제를 살펴보겠습니다. 이번에는 아폴로 클라이언트가 제공한 useMutation 훅을 사용하여 데이터를 컴포넌트에 제공하겠습니다.

```javascript
import React, { useState } from 'react';
import './styles.css';

import { useMutation } from '@apollo/react-hooks';
import { ADD_MESSAGE } from './resolvers';

export default function Input() {
  const [message, setMessage] = useState('');
  const [addMessage] = useMutation(ADD_MESSAGE, {
    variables: { message },
  });

  return (
    <div className="input-row">
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Type something..."
      />
      <button onClick={addMessage}>Add</button>
    </div>
  );
}
```

useMutation 훅을 사용하여 컴포넌트에 데이터를 제공하기 위해 필요한 코드의 양을 줄였습니다.

상용구가 줄어든 것 외에도 컴포넌트에서 여러 리졸버의 데이터를 사용하는 것이 훨씬 쉬워졌습니다. 여러 개의 상위 컴포넌트를 작성할 필요 없이 컴포넌트에 여러 개의 후크를 작성하기만 하면 됩니다. 이렇게 하면 데이터가 컴포넌트에 전달되는 방식을 훨씬 쉽게 파악할 수 있으며, 컴포넌트를 리팩토링하거나 더 작은 조각으로 나눌 때 개발자 경험을 개선할 수 있습니다.

## 장점

고차 컴포넌트 패턴을 사용하면 재사용하려는 로직을 모두 한 곳에 보관할 수 있습니다. 이렇게 하면 코드를 계속 복제해 실수로 실수로 애플리케이션 전체에 버그를 퍼뜨려 매번 새로운 버그가 발생할 위험을 줄일 수 있습니다. 로직을 모두 한 곳에 보관하면 코드가 깔끔하게 유지되고 관심사를 쉽게 분리할 수 있습니다.

## 단점

고차 컴포넌트로 요소에 전달하는 프로퍼티명에서 충돌이 발생할 수 있습니다.

```javascript
function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button style={{ color: 'red' }}>Click me!</button>
const StyledButton = withStyles(Button)
```

이 경우, withStyles 고차 컴포넌트는 전달한 요소에 스타일이라는 프로퍼티를 추가합니다. <br/>
하지만 버튼 컴포넌트에는 이미 스타일이라는 프로퍼티가 있으므로 덮어쓰게 됩니다! <br/>
프로퍼티 이름을 바꾸거나 프로퍼티를 병합하여 고차 컴포넌트가 프로퍼티명 충돌을 처리할 수 있는지 확인하세요.

```javascript
function withStyles(Component) {
  return props => {
    const style = {
      padding: '0.2rem',
      margin: '1rem',
      ...props.style
    }

    return <Component style={style} {...props} />
  }
}

const Button = () = <button style={{ color: 'red' }}>Click me!</button>
const StyledButton = withStyles(Button)
```

프로퍼티를 모두 그 안에 래핑된 요소로 전달하는 여러 개의 구성된 고차 컴포넌트를 사용하는 경우 <br/>
어떤 고차 컴포넌트가 어떤 소품을 담당하는지 파악하기 어려울 수 있습니다. <br/>
이는 애플리케이션을 쉽게 디버깅하고 확장하는 데 방해가 될 수 있습니다.

## 참고자료

[Higher-Order Components - React](https://legacy.reactjs.org/docs/higher-order-components.html)

```toc

```
