const React = require('react');
require('prismjs/themes/prism.css');

const PageWrapper = ({ element }) => {
  return React.createElement('div', { className: 'page-transition-wrapper' }, element);
};

exports.wrapPageElement = ({ element }) => {
  return React.createElement(PageWrapper, { element });
};

exports.onRouteUpdate = () => {
  const wrapper = document.querySelector('.page-transition-wrapper');
  if (!wrapper) return;

  wrapper.classList.remove('page-entering');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      wrapper.classList.add('page-entering');
    });
  });
};
