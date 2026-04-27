import React from 'react';
import { navigate } from 'gatsby';

import Layout from '../layout';
import Seo from '../components/seo';
import Post from '../models/post';
import PostList from '../components/post-list';
import './category-template.scss';

function CategoryTemplate({ pageContext }) {
  const { edges, currentCategory, categories } = pageContext;
  const posts = edges.map(({ node }) => new Post(node));

  return (
    <Layout>
      <Seo title="Posts" />
      <div className="category-wrap">
        <div className="category-header">
          <p className="category-header__title">{currentCategory}</p>
          <div className="category-header__tabs">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`category-tab${cat === currentCategory ? ' active' : ''}`}
                onClick={() => navigate(i === 0 ? '/posts' : `/posts/${cat}`)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <PostList posts={posts} />
      </div>
    </Layout>
  );
}

export default CategoryTemplate;
