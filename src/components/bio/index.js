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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
            <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
              <circle
                cx="6"
                cy="6"
                r="6"
                fill="#FF5F56"
                stroke="#E0443E"
                stroke-width=".5"
              ></circle>
              <circle
                cx="26"
                cy="6"
                r="6"
                fill="#FFBD2E"
                stroke="#DEA123"
                stroke-width=".5"
              ></circle>
              <circle
                cx="46"
                cy="6"
                r="6"
                fill="#27C93F"
                stroke="#1AAB29"
                stroke-width=".5"
              ></circle>
            </g>
          </svg>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div className="bio-image-wrapper">
              <Image
                style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                src={bio.thumbnail}
                alt="thumbnail"
              />
            </div>
            <div className="vertical-stack">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="bio-title">@Donghee_Kim</div>
                <IconButtonBar links={social} />
              </div>
              <div className="bio-desc">Front-end developer, knowledge sharer, avid reader and writer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bio;
