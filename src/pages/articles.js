import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout';
import Seo from '../components/seo';
import Post from '../models/post';
import PostList from '../components/post-list';
import { getUniqueCategories } from '../utils/helpers';
import './style.scss';

function ArticlesPage({ data }) {
  const posts = data.allMarkdownRemark.edges.map(({ node }) => new Post(node));
  const categories = getUniqueCategories(posts).filter((c) => c !== 'featured' && c !== 'All');
  const [selected, setSelected] = useState('All');

  const filteredPosts = selected === 'All'
    ? posts
    : posts.filter((p) => p.categories.includes(selected));

  return (
    <Layout>
      <Seo title="Articles — Donghee Kim" />
      <div className="home-wrap">
        {categories.length > 0 && (
          <div className="category-pills">
            <button
              className={`category-pill${selected === 'All' ? ' active' : ''}`}
              onClick={() => setSelected('All')}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill${selected === cat ? ' active' : ''}`}
                onClick={() => setSelected(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        <p className="writing-label">
          {selected === 'All' ? 'Posts' : selected}
        </p>
        <PostList posts={filteredPosts} />
      </div>
    </Layout>
  );
}

export default ArticlesPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          id
          frontmatter {
            categories
            title
            date(formatString: "YYYY-MM-DD")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
