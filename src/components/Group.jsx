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
import Icon from '@material-ui/core/Icon';

const Group = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isDeletion, setIsDeletion] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen((prevProps) => !prevProps)
  }

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
    toggleMenu();
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
    <div className="group__description">
      <Text>{groupData.description}</Text>
      {/* if the user is the owner don't show the join button */}
      {groupData.accessibilityId !== 2 && !isJoined && !isOwner && 
        <Button additionalClass="button-normal" onClick={() => onJoin()}>Csatlakoz??s</Button>
      }
    </div>
  );

  let members = (
    <div className="group__members">
      {isOwner && 
        <Button additionalClass="button-outlined--iconed" onClick={() => setShowSearch(!showSearch)}>
          {showSearch ? "Bez??r??s" : "Megh??v??s"}
          <Icon>{showSearch ? "close" : "search"}</Icon>
        </Button>}
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
    </div>
  );

  let events = (
    <div className="group__events">
      {(isJoined || isOwner) &&
        <Button additionalClass="button-normal--iconed" onClick={() => onEventCreate()}>
          Esem??ny
          <Icon>add</Icon>
        </Button>}
      <EventCards groupId={id} hideNav />
    </div>
  );

  const tabs = [
    {id: 0,
     tabTitle: "Le??r??s",
     tabContent: description
    },
    {id: 1,
     tabTitle: "Tagok",
     tabContent: members
    },
    {id: 2,
     tabTitle: "Esem??nyek",
     tabContent: events
    }
  ];

  return (
    <div className="group">
      {isJoined ? 
        <TopNav
          to="/groups"
          iconName="more_vert"
          onIconClick={() => toggleMenu()}
        /> :
        <TopNav to="/groups" iconName="more_vert"/>
      }
    
      <div className="group__image-container">
        <img src={`http://localhost:8080/${groupData.picture}`}/>
      </div>
      <Text htmlTag="h3">{groupData.name}</Text>
      <div className="group__info">
        <Text>{usersData.length}</Text>
        <Text>Tag</Text>
      </div>

      <TabNav tabs={tabs} />

      {menuOpen && !isDeletion && 
        <Modal isShown={menuOpen} closeModal={() => toggleMenu()}>
          <div className="group__menu">
            {isJoined && !isOwner && 
              <Button onClick={() => onLeave()}>Kil??p??s</Button>
            }
            {isOwner && <Button onClick={() => onModify()}>M??dos??t??s</Button>}
            {isOwner && <Button onClick={() => {setIsDeletion(true)}}>T??rl??s</Button>}     
          </div>
        </Modal>
      }
     
      {isDeletion && 
        <Modal isShown={isDeletion} closeModal={() => {setIsDeletion(!isDeletion)}}>
          <div className="group__deletion">
            <Dialog onAccept={onAcceptDelete} onDecline={() => {setIsDeletion(!isDeletion)}}>Biztos vagy benne, hogy t??r??lni szeretn??d?</Dialog>
          </div>
        </Modal>
      }
    </div>
  );
}

export default Group;
