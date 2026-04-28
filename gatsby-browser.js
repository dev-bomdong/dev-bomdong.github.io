const React = require('react');
require('prismjs/themes/prism.css');

// 뒤로가기(popstate) 여부 감지
let isPopState = false;
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    isPopState = true;
  });
}

const PageWrapper = ({ element }) => {
  return React.createElement('div', { className: 'page-transition-wrapper' }, element);
};

exports.wrapPageElement = ({ element }) => {
  return React.createElement(PageWrapper, { element });
};

exports.onRouteUpdate = () => {
  const wrapper = document.querySelector('.page-transition-wrapper');
  if (!wrapper) return;

  // 뒤로가기 / 스와이프 백: 애니메이션 없이 즉시 표시
  if (isPopState) {
    isPopState = false;
    wrapper.style.transition = 'none';
    wrapper.style.opacity = '1';
    return;
  }

  // 일반 페이지 이동: opacity 0으로 즉시 숨긴 뒤 부드럽게 fade-in
  wrapper.style.transition = 'none';
  wrapper.style.opacity = '0';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      wrapper.style.transition = 'opacity 0.18s ease';
      wrapper.style.opacity = '1';
    });
  });
};
