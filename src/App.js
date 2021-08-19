import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, Redirect, useHistory } from 'react-router-dom';

import { logout } from './services/authenticationService';
import Layout from './hoc/Layout';
import Feed from './containers/Feed';
import SignUpForm from './components/Forms/SignUpForm';
import LoginForm from './components/Forms/LoginForm';
import CreateGroup from './components/Forms/CreateGroup';
import CreateEvent from './components/Forms/CreateEvent';

import './css/style.css';

function App() {
  // To get the current location
  // We need it to change the layouts prop based on this
  const location = useLocation();
  const history = useHistory();

  const [ layoutShown, setLayoutShown ] = useState(true);
  const [ isAuth, setIsAuth ] = useState(false);

  const onLoginAttempt = (result) => {
    setIsAuth(result);
    result && setLayoutShown(true);
  };

  const onLogout = () => {
    logout();
    setIsAuth(false);
    history.push('/');
  }
  
  // This useEffect on specific locations changes the property of the layout
  // ex. in some locations the sidedrawers should not be mounted
  useEffect(() => {
    if(!isAuth) {
      switch (location.pathname) {
        case '/signup':
          setLayoutShown(location.pathname !== "/signup")
          break;

        case '/login':
          setLayoutShown(location.pathname !== "/login")
          break;

        default:
          break;
      };
    };
  }, [location]);

  let routes = (
    <Switch>
      <Route path="/" exact>
        <Feed />
      </Route>
      <Route path="/signup">
        <SignUpForm/>
      </Route>
      <Route path="/login">
        <LoginForm onLoginAttempt={onLoginAttempt}/>
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  if(isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Feed />
        </Route>
        <Route path="/groups/create" exact>
          <CreateGroup />
        </Route>
        <Route path="/events/create">
          <CreateEvent />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  };

  return (
    <Layout isShown={layoutShown} isAuth={isAuth} onLogout={onLogout}>
      {routes}
    </Layout>
  );
}

export default App;
