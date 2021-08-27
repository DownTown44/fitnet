import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getGroupById, deleteGroupById } from '../services/groupService';
import { getGroupUsers, getGroupMember, joinUserToGroup } from '../services/userService';
import Button from './UI/Button';
import Text from './UI/Text';
import UserList from './UserList/UserList';
import Modal from './UI/Modal';
import Dialog from './Dialog/Dialog';

const Group = () => {
  const [groupData, setGroupData] = useState({});
  // usersData = participantsData
  const [usersData, setUsersData] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [isDeletion, setIsDeletion] = useState(false);

  const { id } = useParams();
  const history = useHistory();

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

  const onAcceptClick = async () => {
    await deleteGroupById(id);
    history.push('/groups');
  }

  return (
    <div className="center">
      <Text htmlTag="h3">{groupData.name}</Text>
      <Text>{groupData.description}</Text>
      {/* if the user is the owner don't show the join button */}
      {groupData.accessibilityId !== 2 && !isJoined && <Button onClick={onJoin}>Csatlakozás</Button>}
      <img src={`http://localhost:8080/${groupData.picture}`}/>
      <UserList users={usersData}></UserList>
      {groupData.userId === userData.userId && <Button onClick={() => {setIsDeletion(true)}}>Törlés</Button>}
      {isDeletion && 
      <Modal isShown={isDeletion} closeModal={() => {setIsDeletion(!isDeletion)}}>
        <Dialog onAccept={onAcceptClick} onDecline={() => {setIsDeletion(!isDeletion)}}>Biztos vagy benne, hogy törölni szeretnéd?</Dialog>
      </Modal>}
    </div>
  );
}

export default Group;
