import React from 'react';
import twitterImage from './../img/twitter.png';
import facebookImage from './../img/facebook.png';
import instagramImage from './../img/instagram.png';
const Footer = () => {
  return (
    <div className={"footer"}>
      <div className={"footer-left"}>
        <p>Copyrights 2023
          All Rights Reserved</p>
      </div>
      <div className={" footer-right"}>
        Follow Us &nbsp;
        <a href="#blank"> <img src={instagramImage} alt="Instagram"/>  &nbsp; </a>
        <a href="#blank"> <img src={twitterImage} alt="Twitter"/> &nbsp;</a>
        <a href="#blank"> <img src={facebookImage} alt="Facebook"/> &nbsp;</a>
      </div>
    </div>
  );
}

export default Footer;
