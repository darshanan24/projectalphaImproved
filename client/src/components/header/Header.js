import React, { Component } from 'react';
import './Header.css';
import Logo from './logo/Logo';
import Sidebar from '../Sidebar/Sidebar';
import Usernav from '../usernav/Usernav';
class Header extends Component {
  render() {
    return (
      <header className="app-header">
        <div className="container-fluid">
          <div className="row gutters">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-3 col-4" />
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-4">
              <Logo />
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-3 col-4">
              <Usernav />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
