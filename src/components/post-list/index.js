import React from 'react';
import { navigate } from 'gatsby';
import './style.scss';

function PostList({ posts }) {
  let lastYear = null;

  return (
    <div className="post-list">
      {posts.map((post) => {
        const dateObj = new Date(post.date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const showYear = year !== lastYear;
        lastYear = year;

        return (
          <div
            key={post.id}
            className="post-row"
            onClick={() => navigate(post.slug)}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate(post.slug)}
          >
            <span className="post-row__year" style={{ visibility: showYear ? 'visible' : 'hidden' }}>
              {year}
            </span>
            <span className="post-row__title">{post.title}</span>
            <span className="post-row__date">{month}/{day}</span>
          </div>
        );
      })}
    </div>
  );
}

export default PostList;
