import React from 'react';
import './Sidebar.css';
import Aux from '../../hoc/Aux/Aux';
import NavigationItems from '../NavigationItems/NavigationItems';
import '../../../assets/fonts/icomoon/icomoon.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
const SideDrawer = props => {
  let attachedClasses = ['app-side', 'Open'];
  if (!props.open) {
    attachedClasses = ['app-side', 'Open'];
  }
  return (
    <Aux>
      <aside className={attachedClasses.join(' ')}>
        <div className="side-content">
          <div className="user-profile">
            <h6 class="profile-name">Selected Project</h6>
          </div>
          <nav className="side-nav">
            <NavigationItems />
          </nav>
        </div>
      </aside>
    </Aux>
  );
};
export default SideDrawer;
