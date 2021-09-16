import React from 'react';
import PropTypes from 'prop-types';

import IconImage from '../IconImage/IconImage';
import Button from '../UI/Button';
import Icon from '@material-ui/core/Icon';

import userPicture from '../../assets/userImages/userPicture.png';

const User = (props) => {
  return (
    <div className="user">
      <IconImage 
        className="user-avatar"
        src={props.profilePicture ? props.profilePicture : userPicture} 
        alt="profile" 
      >
        {props.children}
      </IconImage>
      {props.invitable && 
        <Button onClick={props.onInvite} additionalClass="icon-button icon-button--outlined">
          <Icon>add</Icon>
        </Button>
      }
      {props.removable &&
        <Button onClick={props.onRemove} additionalClass="icon-button icon-button--outlined">
          <Icon>close</Icon>
        </Button>
      }
    </div>
  );
}

User.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  invitable: PropTypes.bool,
  onInvite: PropTypes.func,
  removable: PropTypes.bool,
  onRemove: PropTypes.func
};

export default User;
