import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout';
import Seo from '../components/seo';
import Bio from '../components/bio';
import Post from '../models/post';
import PostList from '../components/post-list';
import './style.scss';

function HomePage({ data }) {
  const posts = data.allMarkdownRemark.edges.map(({ node }) => new Post(node));
  const { author } = data.site.siteMetadata;

  return (
    <Layout>
      <Seo title="Bomdong.log" />
      <div className="home-wrap">
        <Bio author={author} />
        <p className="writing-label">Writing</p>
        <PostList posts={posts} />
      </div>
    </Layout>
  );
}

export default HomePage;

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

    site {
      siteMetadata {
        author {
          name
          bio {
            description
          }
          social {
            github
            linkedIn
            post
          }
        }
      }
    }
  }
`;
