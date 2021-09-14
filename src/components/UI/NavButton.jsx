import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

const NavButton = (props) => {
  return (
    <div className={`navButton ${props.additionalClass}`} onClick={props.onClick}>
      <Link to={props.to}>{props.children}</Link>
      <Icon>{props.icon}</Icon>
    </div>
  );
}

export default NavButton;
