import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

function Bio({ author }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  const fullText = author?.bio?.description ?? '';

  useEffect(() => {
    if (!fullText) return;

    // 이름 fade-in 후 살짝 딜레이 → 타이핑 시작
    const startDelay = setTimeout(() => {
      timerRef.current = setInterval(() => {
        indexRef.current += 1;
        setDisplayed(fullText.slice(0, indexRef.current));

        if (indexRef.current >= fullText.length) {
          clearInterval(timerRef.current);
          // 커서 잠깐 깜빡이다가 사라짐
          setTimeout(() => setDone(true), 800);
        }
      }, 65); // 글자당 속도 (ms)
    }, 400);

    return () => {
      clearTimeout(startDelay);
      clearInterval(timerRef.current);
    };
  }, [fullText]);

  if (!author) return null;
  const { name } = author;

  return (
    <div className="bio-wrapper">
      <div className="bio-intro">
        <p className="bio-intro__name">{name}</p>
        <p className="bio-intro__desc">
          {displayed}
          {!done && <span className="bio-intro__cursor" aria-hidden="true">|</span>}
        </p>
      </div>
    </div>
  );
}

export default Bio;
