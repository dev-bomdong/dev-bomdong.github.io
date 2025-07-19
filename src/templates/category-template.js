import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { navigate } from 'gatsby';

import Layout from '../layout';
import Seo from '../components/seo';
import Post from '../models/post';
import CategoryPageHeader from '../components/category-page-header';
import PostTabs from '../components/post-tabs';

function CategoryTemplate({ pageContext }) {
  const { edges, currentCategory } = pageContext;
  const { categories } = pageContext;
  const currentTabIndex = useMemo(
    () => categories.findIndex((category) => category === currentCategory),
    [categories, currentCategory],
  );
  const posts = edges.map(({ node }) => new Post(node));

  // 내부 상태로 탭 인덱스 관리
  const [tabIndex, setTabIndex] = useState(currentTabIndex);

  // currentCategory가 변경되면 탭 인덱스 동기화
  useEffect(() => {
    setTabIndex(currentTabIndex);
  }, [currentTabIndex]);

  const onTabIndexChange = useCallback(
    (e, value) => {
      // 먼저 상태 업데이트
      setTabIndex(value);

      // 그 다음 navigate
      setTimeout(() => {
        if (value === 0) return navigate(`/posts`);
        navigate(`/posts/${categories[value]}`);
      }, 0);
    },
    [categories],
  );

  return (
    <Layout>
      <Seo title="Posts" />
      <CategoryPageHeader title={categories[currentTabIndex]} subtitle={`${posts.length} posts`} />
      <PostTabs tabIndex={tabIndex} onChange={onTabIndexChange} tabs={categories} posts={posts} />
    </Layout>
  );
}

export default CategoryTemplate;
