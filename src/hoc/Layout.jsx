import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header/Header';
import SideDrawer from '../components/Navigation/SideDrawer';

const Layout = (props) => {
  const { innerWidth: width, innerHeight: height } = window;
  const [sideDrawer, setSideDrawer] = useState(false);

  const toggelSideDrawer = () => {
    setSideDrawer((prevState) => !prevState);
  }

  return (
    <div className={`layout ${sideDrawer ? "layout--hidden" : ""}`} style={{height: height}}>
      {sideDrawer ?
        <SideDrawer onLogout={props.onLogout} isAuth={props.isAuth} closeSideDrawer={toggelSideDrawer}/> :
        <>
          {props.location.pathname == '/' && 
            <Header isAuth={props.isAuth} onLogout={props.onLogout} menuOnClick={() => toggelSideDrawer()}/>
          }
          {props.children}
        </>
      }
    </div>
  );
}

Layout.propTypes = {
  isShown: PropTypes.bool,
  isAuth: PropTypes.bool.isRequired
}

Layout.defaultProps = {
  isShown: true
}

export default Layout;
