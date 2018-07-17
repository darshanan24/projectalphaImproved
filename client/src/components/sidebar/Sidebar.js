import React from 'react';
import './Sidebar.css';
import Aux from '../Aux/Aux';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import '../../assets/fonts/icomoon/icomoon.css';
const Sidebar = props => (
  <Aux>
    <a className="mini-nav-btn">
      <i className="icon-menu5" />
    </a>
    <aside className="app-side is-open">
      <div className="side-content">
        <nav className="side-nav">
          <NavigationItems />
        </nav>
      </div>
    </aside>
  </Aux>
);
export default Sidebar;
