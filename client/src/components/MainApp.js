import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login/Login';
import Layout from './Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import Project from './containers/Project/Project';

const Dashboard = () => <h2>Dashbaord</h2>;
const Landing = () => <h2>Landing</h2>;

class MainApp extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Project />
        </Layout>
      </div>
    );
  }
}

export default MainApp;
