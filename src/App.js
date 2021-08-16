import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import Layout from './hoc/Layout';
import Feed from './containers/Feed';
import SignUpForm from './components/Forms/SignUpForm';

import './css/style.css';

function App() {
  // To get the current location
  // We need it to change the layouts prop based on this
  const location = useLocation();
  const [ layoutShown, setLayoutShown ] = useState(true);
  
  // This useEffect on specific locations changes the property of the layout
  // ex. in some locations the sidedrawers should not be mounted
  useEffect(() => {
    setLayoutShown(location.pathname !== "/signup")
  }, [location]);

  let routes = (
    <Switch>
      <Route path="/" exact>
        <Feed />
      </Route>
      <Route path="/signup">
        <SignUpForm/>
      </Route>
    </Switch>
  );

  return (
    <Layout isShown={layoutShown}>
      {routes}
    </Layout>
  );
}

export default App;
