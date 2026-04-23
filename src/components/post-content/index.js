import React, { useEffect, useRef } from 'react';
import './style.scss';

function PostContent({ html }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // blockquote 내 <p><strong>...</strong></p> 단독 패턴을 풀쿼트로 변환
    const blockquotes = contentRef.current.querySelectorAll('blockquote');
    blockquotes.forEach((bq) => {
      const children = Array.from(bq.children);
      if (children.length === 1 && children[0].tagName === 'P') {
        const p = children[0];
        const inner = Array.from(p.childNodes);
        const isOnlyStrong =
          inner.length === 1 &&
          inner[0].nodeType === Node.ELEMENT_NODE &&
          inner[0].tagName === 'STRONG';

        if (isOnlyStrong) {
          const text = inner[0].textContent;
          const pullQuote = document.createElement('div');
          pullQuote.className = 'pull-quote';
          pullQuote.dataset.text = text;

          const quotePara = document.createElement('p');
          quotePara.textContent = text;

          const hint = document.createElement('span');
          hint.className = 'copy-hint';
          hint.textContent = '클릭해서 복사';

          pullQuote.appendChild(quotePara);
          pullQuote.appendChild(hint);

          pullQuote.addEventListener('click', () => {
            navigator.clipboard.writeText(text).catch(() => {});
            pullQuote.classList.add('copied');
            hint.textContent = '복사됨';
            setTimeout(() => {
              pullQuote.classList.remove('copied');
              hint.textContent = '클릭해서 복사';
            }, 1800);
          });

          bq.replaceWith(pullQuote);
        }
      }
    });
  }, [html]);

  return (
    <div className="post-content" ref={contentRef}>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default PostContent;
