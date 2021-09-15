import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getGroupById, deleteGroupById } from '../services/groupService';
import { 
  getGroupUsers, 
  getGroupMember, 
  joinUserToGroup,
  userLeaveGroup } from '../services/userService';

import Button from './UI/Button';
import Text from './UI/Text';
import SearchUsers from './Search/SearchUsers';
import UserList from './UserList/UserList';
import Modal from './UI/Modal';
import Dialog from './Dialog/Dialog';
import EventCards from './Cards/EventCards/EventCards';
import TopNav from './Navigation/TopNav';
import TabNav from './Navigation/TabNav';

const Group = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isDeletion, setIsDeletion] = useState(false);
  const [groupData, setGroupData] = useState({});
  // usersData = membersData
  const [usersData, setUsersData] = useState([]);
  const [actionDetails, setActionDetails] = useState({
    type: "group",
    id: null
  });

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

  useEffect(() => {
    if (!isOwner && userData.userId === groupData.userId) {
      setIsOwner(true);
      setActionDetails((prevProps) => {return {...prevProps, id: groupData.groupId}});
    } 
  }, [groupData]);

  const onUserListChange = async () => {
    // This will rerender the userlist after an invitation or delete
    const usersRes = await getGroupUsers(id);
    setUsersData(usersRes);
  };

  const onJoin = async() => {
    const result = await joinUserToGroup(userData.userId, id);

    if (result.success) {
      setIsJoined(true);
      onUserListChange();
    }
  }

  const onLeave = async () => {
    const result = await userLeaveGroup(userData.userId, id);

    if (result.success) {
      setIsJoined(false);
      onUserListChange();
    }
  }

  const onAcceptDelete = async () => {
    await deleteGroupById(id);
    history.push('/groups');
  }

  const onModify = async () => {
    history.push(`/groups/${id}/edit`);
  }

  const onEventCreate = async () => { 
    history.push({pathname: '/events/create', state: groupData});
  }

  let description = (
    <>
      <Text>{groupData.description}</Text>
      {/* if the user is the owner don't show the join button */}
      {groupData.accessibilityId !== 2 && !isJoined && !isOwner && 
        <Button onClick={() => onJoin()}>Csatlakozás</Button>
      }
      {isOwner && <Button onClick={() => onModify()}>Módosítás</Button>}
      {
        isJoined && !isOwner && 
        <Button onClick={() => onLeave()}>Kilépés</Button>
      }
      {isOwner && <Button onClick={() => {setIsDeletion(true)}}>Törlés</Button>}
    </>
  );

  let members = (
    <>
      {isOwner && <Button onClick={() => setShowSearch(!showSearch)}>Meghívás</Button>}
      {
        showSearch &&
        <SearchUsers 
          invitable={true} 
          actionDetails={actionDetails} 
          parentRerender={onUserListChange}
          members={usersData}
        />
      }
      {
        isOwner ? 
        <UserList 
          users={usersData} 
          actionDetails={actionDetails} 
          parentRerender={onUserListChange} 
          removable={true}
        /> :
        <UserList users={usersData}/>
      }
    </>
  );

  let events = (
    <>
      {(isJoined || isOwner) &&
        <Button onClick={() => onEventCreate()}>Esemény létrehozása</Button>}
      <EventCards groupId={id} />
    </>
  );

  const tabs = [
    {id: 0,
     tabTitle: "Leírás",
     tabContent: description
    },
    {id: 1,
     tabTitle: "Tagok",
     tabContent: members
    },
    {id: 2,
     tabTitle: "Események",
     tabContent: events
    }
  ];

  return (
    <div className="group">
      <TopNav
        to="/groups"
        iconName="more_vert"
      />
      <div className="group__image-container">
        <img src={`http://localhost:8080/${groupData.picture}`}/>
      </div>
      <Text htmlTag="h3">{groupData.name}</Text>
      <div className="group__info">
        <Text>{usersData.length}</Text>
        <Text>Tag</Text>
      </div>

      <TabNav tabs={tabs} />
     
      {
        isDeletion && 
        <Modal isShown={isDeletion} closeModal={() => {setIsDeletion(!isDeletion)}}>
          <Dialog onAccept={onAcceptDelete} onDecline={() => {setIsDeletion(!isDeletion)}}>Biztos vagy benne, hogy törölni szeretnéd?</Dialog>
        </Modal>
      }
    </div>
  );
}

export default Group;
