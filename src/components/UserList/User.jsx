import React from 'react';
import PropTypes from 'prop-types';

import IconImage from '../IconImage/IconImage';
import Button from '../UI/Button';

const User = (props) => {
  return (
    <div>
      <IconImage 
        src={props.profilePicture} 
        alt="profile" 
        removable={props.removable} 
        onRemove={props.onRemove}
      >
        {props.children}
      </IconImage>
      {props.invitable && <Button onClick={props.onInvite}>Hozzáadás</Button>}
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
