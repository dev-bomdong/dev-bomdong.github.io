import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef(null);

  const filteredHeadings = (headings || []).filter((h) => h.depth <= 3);

  useEffect(() => {
    if (filteredHeadings.length === 0) return;

    const headingEls = filteredHeadings
      .map((h) => {
        const id = h.value
          .toLowerCase()
          .replace(/[^\w\s가-힣]/g, '')
          .trim()
          .replace(/\s+/g, '-');
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (headingEls.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    );

    headingEls.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  if (filteredHeadings.length === 0) return null;

  return (
    <aside className="toc">
      {filteredHeadings.map((h) => {
        const id = h.value
          .toLowerCase()
          .replace(/[^\w\s가-힣]/g, '')
          .trim()
          .replace(/\s+/g, '-');
        return (
          <a
            key={id}
            href={`#${id}`}
            className={`toc__item toc__item--h${h.depth}${activeId === id ? ' active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveId(id);
              }
            }}
          >
            {h.value}
          </a>
        );
      })}
    </aside>
  );
}

export default TableOfContents;
