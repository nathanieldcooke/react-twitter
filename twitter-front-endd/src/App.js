import React from 'react';
import { Route, Switch } from "react-router";
import { NavLink } from 'react-router-dom'
import Home from './components/Home';
import Profile from './components/Profile';
import LoginForm from './components/session/LoginForm';
import RegistrationForm from './components/session/RegistrationForm';

function App() {
  return (
    <div>'
      <h1>Twitter Lite</h1>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='register'>Register</NavLink>
        <NavLink to='/login'>Login</NavLink>

      </nav>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/register'>
          <RegistrationForm />
        </Route>
        <Route path='/login'>
          <LoginForm/>
        </Route>
        <Route path='/users/:userId'>
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
