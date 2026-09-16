const React = require('react');
require('prismjs/themes/prism.css');

const PageWrapper = ({ element }) => {
  return React.createElement('div', { className: 'page-transition-wrapper' }, element);
};

exports.wrapPageElement = ({ element }) => {
  return React.createElement(PageWrapper, { element });
};

// gatsby-plugin-offline was removed because its service worker kept serving
// stale page-data/chunks after a deploy, breaking client-side navigation to
// some posts (TOC missing, layout collapsing) until a hard refresh. Actively
// tear down any service worker + caches already installed in visitors' browsers.
exports.onClientEntry = () => {
  if (typeof navigator === 'undefined' || !navigator.serviceWorker) return;

  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });

  if (typeof caches !== 'undefined') {
    caches.keys().then((names) => {
      names
        .filter((name) => name.startsWith('gatsby-plugin-offline'))
        .forEach((name) => caches.delete(name));
    });
  }
};
