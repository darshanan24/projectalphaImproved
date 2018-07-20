import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className="unifyMenu">
    <NavigationItem link="/" icon="icon-flash-outline">
      Events
    </NavigationItem>
    <NavigationItem link="/orders" icon="icon-flash-outline">
      Dimensions
    </NavigationItem>
    <NavigationItem link="/auth" icon="icon-flash-outline">
      Profile
    </NavigationItem>
  </ul>
);

export default NavigationItems;
