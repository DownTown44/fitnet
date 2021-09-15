import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, Redirect, useHistory } from 'react-router-dom';

import { logout } from './services/authenticationService';
import Layout from './hoc/Layout';
import Feed from './containers/Feed';
import SignUpForm from './components/Forms/SignUpForm';
import LoginForm from './components/Forms/LoginForm';
import FacilityCards from './components/Cards/FacilityCards/FacilityCards';
import Facility from './components/Facility';
import CreateEvent from './components/Forms/CreateEvent';
import EventCards from './components/Cards/EventCards/EventCards';
import Event from './components/Event';
import CreateGroup from './components/Forms/CreateGroup';
import GroupCards from './components/Cards/GroupCards/GroupCards';
import Group from './components/Group';
import DesignSystem from './designSystem/DesignSystem';

import './css/style.css';

function App() {
  // To get the current location
  // We need it to change the layouts prop based on this
  const location = useLocation();
  const history = useHistory();

  const [ isAuth, setIsAuth ] = useState(false);

  const onLoginAttempt = (result) => {
    setIsAuth(result);
    console.log("LOGIN")
  };

  const onLogout = async () => {
    await logout();
    setIsAuth(false);
    window.location.reload();
  }
  
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('userData'));
    setIsAuth(!!loggedInUser);
  }, []);

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
      {/* Facilities can be seen also by guests */}
      <Route path="/facilities" exact>
        <FacilityCards/>
      </Route>
      <Route path="/facilities/:id">
        <Facility/>
      </Route>
      
      {/* Events can be seen also by guest */}
      <Route path="/events" exact>
        <EventCards />
      </Route>

      <Redirect to="/login" />
    </Switch>
  );

  if(isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Feed />
        </Route>
        <Route path="/facilities" exact>
          <FacilityCards/>
        </Route>
        <Route path="/facilities/:id">
          <Facility/>
        </Route>
        <Route path="/events" exact>
          <EventCards />
        </Route>
        <Route path="/events/create">
          <CreateEvent />
        </Route>
        <Route path="/events/:id" exact>
          <Event/>
        </Route>
        <Route path="/events/:id/edit">
          <CreateEvent edit={true}/>
        </Route>
        <Route path="/groups" exact>
          <GroupCards />
        </Route>
        <Route path="/groups/create">
          <CreateGroup />
        </Route>
        <Route path="/groups/:id" exact>
          <Group/>
        </Route>
        <Route path="/groups/:id/edit">
          <CreateGroup edit={true}/>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  };

  return (
    <>
      {location.pathname === '/designSystem' ? 
        <Route path="/designSystem" exact>
          <DesignSystem />
        </Route> :
        <Layout isAuth={isAuth} onLogout={onLogout} location={location}>
          {routes}
        </Layout>}
    </>
  );
}

export default App;
