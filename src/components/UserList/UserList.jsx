import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import User from './User';
import Text from '../UI/Text';

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(props.users);
  }, []);

  return (
    <div className="user-list">
      {users.length !== 0 ? users.map((user) => {
        if (props.editable) {
          return (
            <User key={user.userId} src="NoImage" removable={true} onRemove={props.onRemove}>{`${user.lastName} ${user.firstName}`}</User>
          );
        } else {
          return (
            <User key={user.userId} src="NoImage">{`${user.lastName} ${user.firstName}`}</User>
          );
        }
      }) : <Text>Nincsenek felhasználók</Text>}
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  editable: PropTypes.bool,
  onRemove: PropTypes.func,
}

UserList.defaultProps = {
  editable: false
}

export default UserList;
