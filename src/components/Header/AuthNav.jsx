import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

// TODO: with useEffect check token and set state accordingly 
// (if the user is signed in then switch it to true)

const AuthNav = (props) => {
  return (
    <div>
      {props.isAuth ?
        <Link>Kijelentkezés</Link> :
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
