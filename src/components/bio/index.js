import React from 'react';
import './style.scss';

function Bio({ author }) {
  if (!author) return null;
  const { bio, name } = author;

  const now = new Date();
  const updatedLabel = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <div className="bio-wrapper">
      <div className="bio-intro">
        <p className="bio-intro__label">Updated {updatedLabel}</p>
        <p className="bio-intro__name">{name}</p>
        <p className="bio-intro__desc">{bio?.description}</p>
      </div>
    </div>
  );
}

export default Bio;
