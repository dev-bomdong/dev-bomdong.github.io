---
emoji: 🎬
title: '[강의 후기] React Query/TanStack Query : React로 서버 상태 관리하기'
date: '2024-05-12'
author: Bomdong
tags: React
categories: React
---

## 들어가며

개발자 글쓰기 커뮤니티 글또 9기 활동 중, Udemy의 [React Query/TanStack Query : React로 서버 상태 관리하기](https://www.udemy.com/course/react-query-react/?couponCode=KEEPLEARNING) 강의를 협찬받아 수강했다.

Tanstack Query는 React를 사용하는 프로젝트에서 서버 상태 관리를 위해 거의 필수적으로 사용하고 있는 라이브러리인 만큼 중요도가 높고, 현재 실무에서 사용하고 있지만 그때그때 필요한 기능을 공식문서에서 찾아 활용해본 정도라 강의로 들으면 더 탄탄하게, 미처 놓쳤던 부분도 알아갈 수 있을 것 같아 수강하게 되었다.

## 강의 목차

강의는 아래의 순서로 진행되고, 외국인 강사분이 영어로 진행하기에 한글 자막이 제공된다.

- 쿼리 생성 및 로딩/에러 상태
- 페이지매김, 프리페칭과 변이
- 동적 데이터 로드를 위한 무한 쿼리
- 더 큰 앱에서의 React Query:설정,집중화,커스텀 후크
- 쿼리 특성 1:프리페칭과 페이지 매김
- 쿼리 특성 2:데이터 변환과 데이터 리페칭
- React Query와 인증
- 변이(Mutation): React Query로 서버 데이터 업데이트하기
- React Query 테스트

## 좋았던 점

### Tanstack Query v5로 강의 리뉴얼

2024년 1월부터 Tanstack Query v5에 맞도록 강의가 리뉴얼 되었다.
v5에서 사라진 useQuery callback(onSuccess, onError, onSettled)과 gcTime 등 v5의 변경사항이 반영되지 않았다면 몇몇 부분은 참고로만 들어야 했는데 (실제로 작년 연말즈음 리뷰를 보니 그렇게 수강하신 분들이 많은 듯 했다.) 최신 버전이 반영되어 아주 편했다.

### 기초부터 큰 규모의 앱, 테스트까지 넓은 범위

useQuery, useMutation의 활용 사례를 하나의 함수로 단순하게 보여주는게 아니라 큰 규모의 앱에서 사용하도록 custom hook을 만드는 부분까지 커버해줘서 좋았다. 실무에선 custom hook을 만들어 쓰는 경우가 더 많을테니. 또 테스트 섹션만 1시간 정도 진행되어 유용했다.

## 아쉬웠던 점

모든 제목/강의내용이 번역되어야 하니 어쩔 수 없었겠지만.. 아래 단어들은 영어 그 자체로 고유명사처럼 쓰이고 있어 오히려 번역된 단어가 어색했다. 영어 단어 그 자체로 보여줘도 괜찮지 않았을까 하는 사소한 바람

- 페이지 매김 (= Pagination)
- 변이 (= mutation)
- 무한 쿼리 (= InfiniteQuery)

## 러닝포인트

### isLoading vs isFetching

지금껏 두 개념을 딱히 연관짓지 않고 isLoading은 쿼리를 처음 실행해서 데이터를 가져오는 status이고 isFetching은 비동기 쿼리 자체의 status를 파악하기 위함이라고만 생각하고 있었다.
강의에서 isLoading은 isFetching의 하위집합이고 두 속성의 차이는 결국 **캐시에 데이터가 존재하는지 여부**라고 깔끔하게 정리해줘서 차이점을 명확하게 다시 한 번 정리했다.

### preFetching

실무에선 loading, error status를 파악해 그에 맞는 요소를 렌더링하는 `<QueryResultGuard />` 컴포넌트를 만들어 활용했었는데, preFetching을 활용하면 불필요한 skeleton 노출을 줄일 수 있겠다는 생각이 들었다.

특히 현 회사에서 이전에 담당하던 신규 서비스는 80%가 MUI Data Grid를 커스텀한 테이블로 이루어져있었는데, row별 column 데이터가 많아 페이지를 변경하면 로드 시간이 꽤 걸렸다. 그때마다 spinner를 보여줬었는데 preFetching을 적용했다면 훨씬 매끄러운 사용자경험을 가져왔을 것 같아 반성하게 된다..🤕

## 총평

Tanstack Query를 실무적인 관점에서 좀더 알아보고 싶은 분들께 추천하는 강의. 실무에서 사용하고 있는 분들도 한번쯤 들어볼만 할 것 같다.

```toc

```
