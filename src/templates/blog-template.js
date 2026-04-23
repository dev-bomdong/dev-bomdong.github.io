import React from 'react';
import { graphql, navigate } from 'gatsby';
import Layout from '../layout';
import Seo from '../components/seo';
import Post from '../models/post';
import PostContent from '../components/post-content';
import PostNavigator from '../components/post-navigator';
import Utterances from '../components/utterances';
import TableOfContents from '../components/table-of-contents';
import ReadingProgressBar from '../components/reading-progress-bar';
import './blog-template.scss';

function BlogTemplate({ data }) {
  const curPost = new Post(data.cur);
  const prevPost = data.prev && new Post(data.prev);
  const nextPost = data.next && new Post(data.next);
  const { siteUrl, comments } = data.site?.siteMetadata;
  const utterancesRepo = comments?.utterances?.repo;
  const headings = data.cur.headings || [];

  return (
    <Layout>
      <ReadingProgressBar />
      <Seo title={curPost?.title} description={curPost?.excerpt} />
      <div className="post-outer">
        <TableOfContents headings={headings} />
        <div className="post-wrap">
          <header className="post-header">
            <button className="post-back-btn" onClick={() => navigate(-1)}>← Writing</button>
            <div className="post-meta-line">
              <span>{curPost.date}</span>
              {curPost.categories?.filter(c => c !== 'featured').map((cat) => (
                <span key={cat}>#{cat}</span>
              ))}
            </div>
            <h1 className="post-title">{curPost.title}</h1>
          </header>
          <PostContent html={curPost.html} />
          <PostNavigator prevPost={prevPost} nextPost={nextPost} />
          {utterancesRepo && <Utterances repo={utterancesRepo} path={curPost.slug} />}
        </div>
      </div>
    </Layout>
  );
}

export default BlogTemplate;

export const pageQuery = graphql`
  query($slug: String, $nextSlug: String, $prevSlug: String) {
    cur: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 500, truncate: true)
      headings {
        value
        depth
      }
      frontmatter {
        date(formatString: "YYYY년 MM월 DD일")
        title
        categories
        author
        emoji
      }
      fields {
        slug
      }
    }

    next: markdownRemark(fields: { slug: { eq: $nextSlug } }) {
      id
      frontmatter {
        date(formatString: "YYYY년 MM월 DD일")
        title
        categories
        author
        emoji
      }
      fields {
        slug
      }
    }

    prev: markdownRemark(fields: { slug: { eq: $prevSlug } }) {
      id
      frontmatter {
        date(formatString: "YYYY년 MM월 DD일")
        title
        categories
        author
        emoji
      }
      fields {
        slug
      }
    }

    site {
      siteMetadata {
        siteUrl
        comments {
          utterances {
            repo
          }
        }
      }
    }
  }
`;
