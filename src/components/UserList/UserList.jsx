import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { inviteUserToEvent } from '../../services/userService';
import User from './User';
import Text from '../UI/Text';

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(props.users);
  }, [props.users]);

  const onInvite = (userId) => {
    const {type, id} = props.inviteDetails;
    
    if (type === "event") {
      inviteUserToEvent(userId, id);
    } else if (type === "group") {
      // Not implemented yet
      // inviteUserToGroup(userId, id)
    }

  }

  return (
    <div className="user-list">
      {users.length !== 0 ? users.map((user) => {
        // TODO: Make this cleaner
        if (props.removable) {
          return (
            <User 
              key={user.userId} 
              profilePicture="NoImage" 
              removable={true} 
              onRemove={props.onRemove}
            >
              {`${user.lastName} ${user.firstName}`}
            </User>
          );
        } else if (props.invitable) {
          return (
            <User 
              key={user.userId} 
              profilePicture="NoImage" 
              invitable={true} 
              onInvite={() => onInvite(user.userId)}
            >
              {`${user.lastName} ${user.firstName}`}
            </User>
          );
        } else {
          return (
            <User 
              key={user.userId} 
              profilePicture="NoImage"
            >
              {`${user.lastName} ${user.firstName}`}
            </User>
          );
        }
      }) : <Text>Nincsenek felhasználók</Text>}
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  removable: PropTypes.bool,
  onRemove: PropTypes.func,
  invitable: PropTypes.bool,
  onInvite: PropTypes.func
}

UserList.defaultProps = {
  removable: false,
  invitable: false,
}

export default UserList;
