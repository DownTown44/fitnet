import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { inviteUserToEvent, removeUserFromEvent } from '../../services/userService';
import User from './User';
import Text from '../UI/Text';

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(props.users);
  }, [props.users]);

  const onInvite = async (userId) => {
    const {type, id} = props.actionDetails;
    
    if (type === "event") {
      const result = await inviteUserToEvent(userId, id);

      if (result.success) {
        // Rerenders the other userList at the grandparent component after user invitation
        props.parentRerender()
      };
    } else if (type === "group") {
      // Not implemented yet
      // inviteUserToGroup(userId, id)
    };
  }

  const onRemove = async (userId) => {
    const {type, id} = props.actionDetails;
    
    if (type === "event") {
      const result = await removeUserFromEvent(userId, id)
      if (result.succes) {
        // Rerenders the other userList at the grandparent component after user remove
        props.parentRerender()
      };
    } else if (type === "group") {
      // Not implemented yet
      // inviteUserToGroup(userId, id)
    };
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
              onRemove={() => onRemove(user.userId)}
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
