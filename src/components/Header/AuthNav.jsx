import React from 'react';
import { Link } from 'react-router-dom'

// TODO: with useEffect check token and set state accordingly 
// (if the user is signed in then switch it to true)

const AuthNav = () => {
  return (
    <div>
      <Link>Kijelentkezés</Link>
      <Link to="/signup">Regisztráció</Link>
      <Link>Bejelentkezés</Link>
    </div>
  );
}

export default AuthNav;
