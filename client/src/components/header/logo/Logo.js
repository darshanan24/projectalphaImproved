import React from 'react';
import './Logo.css';
import IzacLogo from '../../../assets/images/logo.png';
const Logo = props => (
  <a className="logo">
    <img src={IzacLogo} alt="Izac" />
  </a>
);

export default Logo;
