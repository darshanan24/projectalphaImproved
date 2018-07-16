import React from 'react';
import '../header/Header.css';
import Avatar from '../../assets/images/user.png';
const Usernav = props => (
  <ul className="header-actions">
    <li className="dropdown">
      <a className="user-settings">
        <img className="avatar" src={Avatar} alt="user" />
        <span className="user-name">Asit Parija</span>
        <i className="icon-chevron-small-down" />
      </a>
    </li>
  </ul>
);
export default Usernav;
