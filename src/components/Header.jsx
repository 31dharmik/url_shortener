import React from 'react';
// import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-icon">
        <span className="icon-emoji">🔗</span>
      </div>
      <h1 className="header-title">URL Shortener</h1>
      <p className="header-subtitle">Transform long URLs into short, shareable links</p>
    </header>
  );
};

export default Header;