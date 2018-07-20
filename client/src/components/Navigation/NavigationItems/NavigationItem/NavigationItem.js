import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const NavigationItem = props => (
  <li>
    <NavLink to={props.link} exact={props.exact} activeClassName="active">
      <span className="has-icon">
        <i className={props.icon} />
      </span>
      <span className="nav-title">{props.children}</span>
    </NavLink>
  </li>
);

export default NavigationItem;
