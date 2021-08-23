import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Logo from '../Logo';
import SearchBar from '../SearchBar';
import Button from '../UI/Button';
import AuthNav from './AuthNav';

const Header = (props) => {
  const history = useHistory();
  return (
    <div className="header">
      <Logo src="noLogo" alt="Logo" onClick={() => history.push('/')} />
      <SearchBar />
      <AuthNav isAuth={props.isAuth} onLogout={props.onLogout}/>
      <Button onClick={props.menuOnClick}>Menu</Button>
    </div>
  );
};

Header.propTypes = {
  menuOnClick: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};

export default Header;
