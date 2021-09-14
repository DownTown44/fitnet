import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

const NavButton = (props) => {
  const history = useHistory();

  return (
    <div className={`navButton ${props.additionalClass}`} onClick={props.onClick}>
      <Link to={props.to}>{props.children}</Link>
      <Icon onClick={() => history.push(props.to)}>{props.icon}</Icon>
    </div>
  );
}

export default NavButton;
