import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './header/Header';
import Login from './login/Login';
import Layout from './Layout/Layout';
import { BrowserRouter } from 'react-router-dom';

const Dashboard = () => <h2>Dashbaord</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <div>
            <Route exact={true} path="/" component={Layout} />
            <Route exact={true} path="/login" component={Login} />
          </div>
        </Switch>
      </div>
    );
  }
}

export default App;
