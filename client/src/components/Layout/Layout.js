import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import './Layout.css';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import { BrowserRouter } from 'react-router-dom';

const Dashboard = () => <h2>Dashbaord</h2>;
const Landing = () => <h2>Landing</h2>;

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Header />
        <div className="app-container">
          <Sidebar />
        </div>
        {this.props.children}
      </Aux>
    );
  }
}

export default Layout;
