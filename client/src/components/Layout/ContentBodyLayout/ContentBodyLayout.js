import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import './ContentBodyLayout.css';
class ContentBodyLayout extends Component {
  render() {
    return (
      <Aux>
        <div className="main-content">{this.props.children}</div>
      </Aux>
    );
  }
}

export default ContentBodyLayout;
