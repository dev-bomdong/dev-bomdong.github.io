import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout';
import Seo from '../components/seo';
import Bio from '../components/bio';
import Post from '../models/post';
import PostList from '../components/post-list';
import './style.scss';

function HomePage({ data }) {
  const allPosts = data.allMarkdownRemark.edges.map(({ node }) => new Post(node));
  const { author } = data.site.siteMetadata;

  const recentPosts = allPosts.filter((post) => {
    const year = new Date(post.date).getFullYear();
    return year >= 2025;
  });

  return (
    <Layout>
      <Seo title="Donghee Kim" />
      <div className="home-wrap">
        <Bio author={author} />
        <p className="writing-label">Recent articles</p>
        <PostList posts={recentPosts} />
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
