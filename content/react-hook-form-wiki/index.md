---
emoji: 🔖
title: react-hook-form을 사용하며 알게된 것들
date: '2023-12-24'
author: Bomdong
tags: React
categories: '#React'
---

## 들어가며

업무 중 react-hook-form을 사용하다보니 공식문서에 기재된 best practice뿐만 아니라 이런 저런 방법으로 응용이 필요했다.
나름의 방법으로 고심해보며 중간중간 드는 궁금증들은 실제 구현된 코드도 찾아보며 해결해보기도 했다. 그 여정을 간단히 기록해보는 글.
react-hook-form은 앞으로도 계속해서 사용할테니 아래 내용은 더 추가될 예정.

## 서로 다른 컴포넌트에서 form 상태 공유하기

한 파일 안에 모든 input이 존재해 form data가 관리되는 형태라면 큰 어려움이 없겠지만,

component 단위로 개발하는 react 특성상 form data를 공유하는 여러 component가 존재할 수 있다.

React Hook Form은 React의 Context API를 활용해 서로 다른 컴포넌트 간에도 form의 상태를 공유하는 custom hook `useFormContext` 와 `FormProvider` 컴포넌트를 제공한다.

각각 코드로 살펴보자.

```typescript
// context 생성
const HookFormContext = React.createContext<UseFormReturn | null>(null);

// HookFormContext를 사용하는 custom hook
export const useFormContext = <
  TFieldValues extends FieldValues,
  TContext = any,
  TransformedValues extends FieldValues | undefined = undefined
>(): UseFormReturn<TFieldValues, TContext, TransformedValues> =>
  React.useContext(HookFormContext) as UseFormReturn<TFieldValues, TContext, TransformedValues>;

export const FormProvider = <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>(
  props: FormProviderProps<TFieldValues, TContext, TTransformedValues>,
) => {
  const { children, ...data } = props;
  return (
    <HookFormContext.Provider value={(data as unknown) as UseFormReturn}>
      {children}
    </HookFormContext.Provider>
  );
};
```

## FormProvider, form 태그 외부에서 handleSubmit을 해야할 때

일반적으로 HTML form 태그의 submit event는 `type=”submit”` 형태의 제출 버튼이 form 내부에 위치해야 발생한다.

하지만 react-hook-form을 사용할 때 특정한 이유로 form submit을 form 태그 바깥에서 처리해야 한다면..? (그럴 일이 없을 것 같지만 디자인 시스템 모달을 사용하다보니 스타일링 이슈가 발생하더라)

방법은 form 태그의 외부에서 `methods.handleSubmit(onSubmit)()`; 형태로 `handleSubmit` 함수를 호출하면 된다.

```typescript
const methods = useForm({
defaultValues: {...}
})

const onSubmit = (formData) => {
    ....
  };

<ModalContainer>
  <ModalBody>
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>...</form>
    </FormProvider>
  </ModalBody>
  <ModalFooter>
    <button onClick={()=>{methods.handleSubmit(onSubmit)();}}> //here
		save
		</button>
  </ModalFooter>
</ModalContainer>;
```

React Hook Form에서 제공하는 handleSubmit 함수는 form 유효성 검사 결과에 따른 콜백 함수 `onValid`, `onInvalid`를 인자로 받아 form 유효성 검사에 따라 각각 호출한다. form data의 유효성 검사 및 처리 방식을 완전히 제어할 수 있다.

그렇다면 handleSubmit 함수가 어떻게 이루어져있는지 코드로 살펴보자.

```typescript
const handleSubmit: UseFormHandleSubmit<TFieldValues> = (onValid, onInvalid) => async (e) => {
  if (e) {
    e.preventDefault && e.preventDefault();
    e.persist && e.persist();
  }
  let fieldValues = cloneObject(_formValues);

  // form submit 시작 알림
  _subjects.state.next({
    isSubmitting: true,
  });

  // resolver가 있으면 _executeSchema로, 없으면 executeBuiltInValidation로 유효성 검사
  if (_options.resolver) {
    const { errors, values } = await _executeSchema();
    _formState.errors = errors;
    fieldValues = values;
  } else {
    await executeBuiltInValidation(_fields);
  }

  unset(_formState.errors, 'root'); //root 오류 제거

  // formState의 error 객체가 비어있으면 onValid, 존재하면 onInvalid 호출
  if (isEmptyObject(_formState.errors)) {
    _subjects.state.next({
      errors: {},
    });
    await onValid(fieldValues as TFieldValues, e);
  } else {
    if (onInvalid) {
      await onInvalid({ ..._formState.errors }, e);
    }
    // 오류가 발생한 첫 번째 field에 focus 맞춤
    _focusError();
    setTimeout(_focusError);
  }
  // form submit이 끝났음을 알리고 form 상태 update
  _subjects.state.next({
    isSubmitted: true,
    isSubmitting: false,
    isSubmitSuccessful: isEmptyObject(_formState.errors),
    submitCount: _formState.submitCount + 1,
    errors: _formState.errors,
  });
};
```

앞서 언급한 것처럼 form의 유효성 검사 후 error 객체에 따라 onValid, onInvalid 함수를 호출하고 있다. 이 함수는 form의 onSubmit 이벤트 외에도 다른 이벤트에서도 호출할 수 있다.

```toc

```
