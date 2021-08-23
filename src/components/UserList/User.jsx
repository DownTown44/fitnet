import React from 'react';
import PropTypes from 'prop-types';

import IconImage from '../IconImage/IconImage';

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
    </div>
  );
}

User.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  removable: PropTypes.bool,
  onRemove: PropTypes.func
};

export default User;
