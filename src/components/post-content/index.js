import React, { useEffect, useRef } from 'react';
import './style.scss';

function PostContent({ html }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // ── 코드블록 복사 버튼 주입 ──
    const codeBlocks = contentRef.current.querySelectorAll('pre');
    codeBlocks.forEach((pre) => {
      if (pre.querySelector('.code-copy-btn')) return; // 중복 방지

      const btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.setAttribute('aria-label', '코드 복사');
      btn.innerHTML =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

      btn.addEventListener('click', () => {
        const code = pre.querySelector('code');
        const text = code ? code.innerText : pre.innerText;
        navigator.clipboard.writeText(text).catch(() => {});
        btn.classList.add('copied');
        btn.innerHTML =
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML =
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
        }, 1800);
      });

      pre.style.position = 'relative';
      pre.appendChild(btn);
    });

    // ── 풀쿼트 변환 ──
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
