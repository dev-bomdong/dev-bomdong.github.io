import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import IconButtonBar from '../icon-button-bar';
import Image from '../image';
import './style.scss';

function Bio({ author, language = 'ko' }) {
  if (!author) return null;
  const { bio, social, name } = author;
  return (
    <div className="bio">
            <Image style={{ width: 90, height: 90 }} src={bio.thumbnail} alt="thumbnail" />
        <h2>dev-bomdong</h2>
          <div className="social-links">
            <IconButtonBar links={social} />
          </div>
    </div>
  );
}

export default Bio;
