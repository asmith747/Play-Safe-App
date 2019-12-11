import React from 'react';
import { LoginPage } from './LoginPage';
import { NewAccountPage } from './NewAccountPage';
import { HomePage } from './homePage';
import { UserPage } from './UserPage';
import { ParkPage } from './ParkPage';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {

    return (
      <BrowserRouter>
        <Route exact path="/" component={LoginPage}/>
        <Route exact path="/NewAccount" component={NewAccountPage}/>
        <Route exact path="/HomePage" component={HomePage}/>
        <Route exact path = "/UserPage" component = {UserPage}/>
        <Route exact path = "/ParkPage" component = {ParkPage}/>
      </BrowserRouter>
      );

}

export default App;
