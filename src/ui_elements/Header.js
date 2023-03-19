import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="header">
        <a href="#" className="logo">
        </a>
        <a href="#" className="name" style={{ fontFamily: "Brush Script MT", fontSize: "30px" }}>Rely</a>
        <div className="header-right">
          <a href="#" className="onHover">Home</a>
          <a href="#" className="onHover">About</a>
          <a href="#" className="onHover">Login</a>
          <a href="#" className="onHover">Register</a>
          <a href="#" className="onHover">Location</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
