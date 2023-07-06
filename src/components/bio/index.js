import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import IconButtonBar from '../icon-button-bar';
import Image from '../image';
import './style.scss';

function Bio({ author, language = 'ko' }) {
  if (!author) return null;
  const { bio, social, name } = author;
  return (
    <div className="bio-wrapper">
      <div className="bio">
        <Image
          style={{ width: 70, height: 70, borderRadius: 50 }}
          src={bio.thumbnail}
          alt="thumbnail"
        />
        <div className="vertical-stack">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="bio-title">Bomdong</div>
            <IconButtonBar links={social} />
          </div>
          <div className="bio-desc">Front-end developer who love recording and networking</div>
        </div>
      </div>
    </div>
  );
}

export default Bio;
