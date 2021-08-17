import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout';
import Feed from './containers/Feed';
import SignUpForm from './components/Forms/SignUpForm';
import LoginForm from './components/Forms/LoginForm';

import './css/style.css';

function App() {
  // To get the current location
  // We need it to change the layouts prop based on this
  const location = useLocation();
  const [ layoutShown, setLayoutShown ] = useState(true);
  const [ isAuth, setIsAuth ] = useState(false);
  
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
        <LoginForm/>
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
        <Redirect to="/" />
      </Switch>
    );
  };

  return (
    <Layout isShown={layoutShown} isAuth={isAuth}>
      {routes}
    </Layout>
  );
}

export default App;
