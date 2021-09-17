import React from 'react';
import Icon from '@material-ui/core/Icon';

import NavButton from '../UI/NavButton';

const TopNav = (props) => {
  return (
    <div className="top-nav">
      <NavButton to={props.to} icon="arrow_back" onClick={props.onClick}>{props.title}</NavButton>
      <Icon onClick={props.onIconClick}>{props.iconName}</Icon>
    </div>
  );
}

export default TopNav;
