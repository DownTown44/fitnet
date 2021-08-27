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
        userResponse,
        joinedResponse,
      ] = await Promise.all([
        getGroupById(id),
        getGroupUsers(id),
        getGroupMember(userData.userId, id)
      ]);

      setGroupData(groupResponse);
      setUsersData(userResponse);
      setIsJoined(joinedResponse);
    })();
  }, []);

  const onJoin = () => {
    setIsJoined(true);
    joinUserToGroup(userData.userId, id);
  }

  return (
    <div className="center">
      <Text htmlTag="h3">{groupData.name}</Text>
      <Text>{groupData.description}</Text>
      {/* if the user is the owner don't show the join button */}
      {groupData.accessibilityId !== 2 && !isJoined && <Button onClick={onJoin}>Csatlakozás</Button>}
      <img src={`http://localhost:8080/${groupData.picture}`}/>
      <UserList users={usersData}></UserList>
    </div>
  );
}

export default Group;
