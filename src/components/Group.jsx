import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getGroupById } from '../services/groupService';
import { getGroupUsers, getGroupMember, joinUserToGroup } from '../services/userService';
import Button from './UI/Button';
import Text from './UI/Text';
import UserList from './UserList/UserList';

const Group = () => {
  const [groupData, setGroupData] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  const { id } = useParams();

  const userData = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
    (async () => {
      const [
        groupResponse,
        userRespons,
        joinedRespons,
      ] = await Promise.all([
        getGroupById(id),
        getGroupUsers(id),
        getGroupMember(userData.userId, id)
      ]);

      setGroupData(groupResponse);
      setUsersData(userRespons);
      setIsJoined(joinedRespons);
    })();
  }, []);

  const onJoin = () => {
    setIsJoined(true);
    joinUserToGroup(userData.userId, id);
  }

  return (
    <div>
      <Text htmlTag="h3">{groupData.name}</Text>
      <Text>{groupData.description}</Text>
      {groupData.accessibilityId !== 2 && !isJoined && <Button onClick={onJoin}>Csatlakozás</Button>}
      <img src={`http://localhost:8080/${groupData.picture}`}/>
      <UserList users={usersData}></UserList>
    </div>
  );
}

export default Group;
