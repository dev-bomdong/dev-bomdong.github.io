const React = require('react');
require('prismjs/themes/prism.css');

// 뒤로가기(popstate / iOS 스와이프 백) 감지
let isPopState = false;
// 첫 로드(SSR hydration)는 애니메이션 없이 바로 표시
let isFirstLoad = true;

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

// 새 페이지 렌더 직전 → 미리 숨겨서 "렌더 후 사라짐" 깜빡임 방지
exports.onPreRouteUpdate = () => {
  if (isFirstLoad || isPopState) return;

  const wrapper = document.querySelector('.page-transition-wrapper');
  if (!wrapper) return;

  wrapper.style.transition = 'none';
  wrapper.style.opacity = '0';
};

// 새 페이지 렌더 완료 후 → 페이드인
exports.onRouteUpdate = () => {
  const wrapper = document.querySelector('.page-transition-wrapper');
  if (!wrapper) return;

  // 첫 로드: 애니메이션 없이 바로 표시
  if (isFirstLoad) {
    isFirstLoad = false;
    wrapper.style.opacity = '1';
    return;
  }

  // 뒤로가기 / 스와이프 백: 즉시 표시
  if (isPopState) {
    isPopState = false;
    wrapper.style.transition = 'none';
    wrapper.style.opacity = '1';
    return;
  }

  // 일반 이동: 0에서 부드럽게 페이드인
  requestAnimationFrame(() => {
    wrapper.style.transition = 'opacity 0.2s ease';
    wrapper.style.opacity = '1';
  });
};
