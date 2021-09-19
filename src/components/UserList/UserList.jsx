import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { 
  inviteUserToEvent,
  removeUserFromEvent, 
  inviteUserToGroup,
  removeUserFromGroup } from '../../services/userService';
import User from './User';
import Text from '../UI/Text';

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
    setUsers(props.users);
  }, [props.users]);

  const onInvite = async (userId) => {
    const {type, id} = props.actionDetails;
    
    if (type === "event") {
      const result = await inviteUserToEvent(userId, id);
      if (result.success) {
        // Rerenders the other userList at the grandparent component after user invitation
        props.parentRerender();
      };
    } else if (type === "group") {
      const result = await inviteUserToGroup(userId, id);
      if (result.success) {
        props.parentRerender();
      };
    };
  }

  const onRemove = async (userId) => {
    const {type, id} = props.actionDetails;
    
    if (type === "event") {
      const result = await removeUserFromEvent(userId, id)
      if (result.success) {
        // Rerenders the other userList at the grandparent component after user remove
        props.parentRerender();
      };
    } else if (type === "group") {
      const result = await removeUserFromGroup(userId, id)
      if (result.success) {
        props.parentRerender();
      }
    };
  }

  return (
    <div className="user-list">
      {users.length !== 0 && users.map((user) => {
        // TODO: Make this cleaner
        if (props.removable) {
          return (
            <User 
              key={user.userId}
              profilePicture={user.profilePicture} 
              removable={userData.userId === user.userId ? false : true} 
              onRemove={() => onRemove(user.userId)}
            >
              {`${user.lastName} ${user.firstName}`}
            </User>
          );
        } else if (props.invitable) {
          return (
            <User 
              key={user.userId} 
              profilePicture={user.profilePicture} 
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
              profilePicture={user.profilePicture} 
            >
              {`${user.lastName} ${user.firstName}`}
            </User>
          );
        }
      })}
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  removable: PropTypes.bool,
  invitable: PropTypes.bool,
  onInvite: PropTypes.func,
  actionDetails: PropTypes.object,
  parentRerender: PropTypes.func
}

UserList.defaultProps = {
  removable: false,
  invitable: false,
}

export default UserList;
