import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';
import Post from '../../models/post';
import PostSearch from '../post-search';
import './style.scss';

function PageHeader() {
  return (
    <StaticQuery
      query={graphql`
        query SearchIndexQuery {
          allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
            edges {
              node {
                frontmatter {
                  title
                  categories
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <header className="page-header-wrapper">
          <div className="page-header">
            <nav className="page-nav">
              <Link className="page-nav__link" to="/" activeClassName="active" exact>
                Home
              </Link>
              <Link className="page-nav__link" to="/articles" activeClassName="active">
                Articles
              </Link>
              <Link className="page-nav__link" to="/about" activeClassName="active">
                About
              </Link>
            </nav>
            <div className="trailing-section">
              <PostSearch
                posts={data.allMarkdownRemark.edges.map(({ node }) => new Post(node, true))}
              />
            </div>
          </div>
        </header>
      )}
    />
  );
}

export default PageHeader;
