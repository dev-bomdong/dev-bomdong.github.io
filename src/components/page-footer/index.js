import React from 'react';
import './style.scss';

function PageFooter({ author, githubUrl }) {
  return (
    <footer className="page-footer-wrapper">
      <p className="page-footer">
        © <a href={githubUrl}>{author}</a>
      </p>
    </footer>
  );
}

export default PageFooter;
