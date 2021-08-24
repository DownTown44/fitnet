import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getGroupById } from '../services/groupService';
import { getGroupUsers } from '../services/userService';
import Text from './UI/Text';
import UserList from './UserList/UserList';

const Group = () => {
  const [groupData, setGroupData] = useState({});
  const [usersData, setUsersData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const [groupResponse, userRespons] = await Promise.all([getGroupById(id), getGroupUsers(id)]);
      setGroupData(groupResponse);
      setUsersData(userRespons);
    })();
  }, []);

  return (
    <div className="center">
      <Text htmlTag="h3">{groupData.name}</Text>
      <Text>{groupData.description}</Text>
      <img src={`http://localhost:8080/${groupData.picture}`}/>
      <UserList users={usersData}></UserList>
    </div>
  );
}

export default Group;
