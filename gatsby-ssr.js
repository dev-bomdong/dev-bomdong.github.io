const React = require('react');

const PageWrapper = ({ element }) => {
  return React.createElement('div', { className: 'page-transition-wrapper' }, element);
};

exports.wrapPageElement = ({ element }) => {
  return React.createElement(PageWrapper, { element });
};
