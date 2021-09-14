import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Button from '../UI/Button';

const AuthNav = (props) => {
  return (
    <div>
      {props.isAuth ?
        <Button onClick={() => props.onLogout()}>Kijelentkezés</Button> :
        <>
          <Link to="/signup">Regisztráció</Link>
          <Link to="/login">Bejelentkezés</Link>
        </>
      }
    </div>
  );
}


AuthNav.propTypes = {
  isAuth: PropTypes.bool.isRequired
}

export default AuthNav;
