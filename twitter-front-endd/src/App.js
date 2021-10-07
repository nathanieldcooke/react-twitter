import React from 'react';
import { Route, Switch } from "react-router";
import { NavLink } from 'react-router-dom'
import Home from './components/Home';
import Profile from './components/Profile';
import LoginForm from './components/session/LoginForm';
import RegistrationForm from './components/session/RegistrationForm';
import { AuthRoute, ProtectedRoute } from './Routes'

function App(props) {

  console.log("Props APP: ", props)

  return (
    <div>'
      <h1>Twitter Lite</h1>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='register'>Register</NavLink>
        <NavLink to='/login'>Login</NavLink>
      </nav>
      <Switch>
        {/* <Route exact path='/'> */}
        <ProtectedRoute exact path="/" component={Home} currentUserId={props.currentUserId} />
          {/* <Home/> */}
        {/* </Route> */}
        {/* <Route path='/register'> */}
        <AuthRoute path="/register" component={RegistrationForm} currentUserId={props.currentUserId}/>
          {/* <RegistrationForm /> */}
        {/* </Route> */}
        {/* <Route path='/login'> */}
          <AuthRoute path="/login" component={LoginForm} currentUserId={props.currentUserId}/>
          {/* <LoginForm/> */}
        {/* </Route> */}
        <Route path='/users/:userId'>
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
