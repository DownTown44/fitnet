import React from 'react';
import { Link } from 'react-router-dom'

// TODO: with useEffect check token and set state accordingly 
// (if the user is signed in then switch it to true)

const AuthNav = () => {
  return (
    <div>
      <Link>Sign out</Link>
      <Link to="/signup">Sign up</Link>
      <Link>Sign in</Link>
    </div>
  );
}

export default AuthNav;
