import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

import Logo from '../Logo';
import LogoImage from '../../assets/logo/logo.svg'

const Header = (props) => {
  const history = useHistory();
  return (
    <div className="header">
      <Logo className="header__logo" src={LogoImage} alt="Logo" onClick={() => history.push('/')} />
        <div className="header__icon-button">
          <Icon>search</Icon>
        </div>
        <div className="header__icon-button">
          <Icon>notifications_none</Icon>
        </div>
        <div className="header__icon-button" onClick={props.menuOnClick}>
          <Icon>menu</Icon>
        </div>
    </div>
  );
};

Header.propTypes = {
  menuOnClick: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};

export default Header;
