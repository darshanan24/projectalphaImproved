import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './header/Header';
import Login from './login/Login';
const Dashboard = () => <h2>Dashbaord</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={Header} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
