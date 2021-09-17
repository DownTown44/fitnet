import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

import { 
  getEventUsers, 
  getEventMember, 
  joinUserToEvent, 
  userLeaveEvent } from '../services/userService';
import { getEventById, deleteEventById } from '../services/eventService';

import Text from './UI/Text';
import Button from './UI/Button';
import SearchUsers from './Search/SearchUsers';
import UserList from './UserList/UserList';
import Modal from './UI/Modal';
import Dialog from './Dialog/Dialog';
import TopNav from './Navigation/TopNav';
import TabNav from './Navigation/TabNav';

const Event = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isDeletion, setIsDeletion] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [eventData, setEventData] = useState({});
  // usersData = participantsData
  const [usersData, setUsersData] = useState([]);
  const [actionDetails, setActionDetails] = useState({
    type: "event",
    id: null
  });

  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const userData = JSON.parse(sessionStorage.getItem('userData'));

  // Sending request to ge data and participants of event
  useEffect(() => {
    (async () => {
      const [
        eventRes,
        usersRes,
        joinedRes
      ] = await Promise.all([
        getEventById(id),
        getEventUsers(id),
        getEventMember(userData.userId, id)
      ]);

      setEventData(eventRes);
      setUsersData(usersRes);
      setIsJoined(joinedRes);
    })();
  }, []);

  // If user is the owner, then he can invite users
  useEffect(() => {
    if (!isOwner && userData.userId === eventData.userId) {
      setIsOwner(true);
      setActionDetails((prevProps) => {return {...prevProps, id: eventData.eventId}});
    } 
  }, [eventData]);

  const toggleMenu = () => {
    setMenuOpen((prevProps) => !prevProps)
  }

  const onUserListChange = async () => {
    // This will rerender the userlist after an invitation or delete
    const usersRes = await getEventUsers(id);
    setUsersData(usersRes);
  };

  const onJoin = async () => {
    const result = await joinUserToEvent(userData.userId, id);
    
    if (result.success) {
      setIsJoined(true);
      onUserListChange();
    }
  }
  
  const onLeave = async () => {
    toggleMenu();
    const result = await userLeaveEvent(userData.userId, id);

    if (result.success) {
      setIsJoined(false);
      onUserListChange();
    }
  }
  
  const onAcceptDelete = async () => {
    await deleteEventById(id);
    history.push('/events');
  }

  const onModify = async () => {
    history.push(`/events/${id}/edit`);
  }

  let description = (
    <div className="event__description">
      <div className="event__description-info">
        <Icon>place</Icon>
        <Text htmlTag="p">{eventData.address}</Text>
      </div>
      <div className="event__description-info">
        <Icon>schedule</Icon>
        <Text htmlTag="p">{eventData.startDate}</Text>
      </div>
      <div className="event__description-info">
        <Icon>people</Icon>
        <Text htmlTag="p">{`${eventData.minParticipant} - ${eventData.maxParticipant} személy`}</Text>
      </div>
      <Text htmlTag="p">{eventData.description}</Text>
      {eventData.accessibilityId !== 2 && !isJoined && !isOwner && 
        <Button additionalClass="button-normal" onClick={() => onJoin()}>Csatlakozás</Button>
      }
    </div>
  );

  let members = (
    <div className="event__members">
      {isOwner && 
        <Button additionalClass="button-outlined--iconed" onClick={() => setShowSearch(!showSearch)}>
          {showSearch ? "Bezárás" : "Meghívás"}
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

  const tabs = [
    {id: 0,
     tabTitle: "Leírás",
     tabContent: description
    },
    {id: 1,
     tabTitle: "Tagok",
     tabContent: members
    }
  ];

  return (
    <div className="event">
      {isJoined ? 
        <TopNav
          to="/events"
          iconName="more_vert"
          onIconClick={() => toggleMenu()}
        /> :
        <TopNav to="/events" iconName="more_vert" />
      }
      <div className="event__image">
        <img src={location.state} />
      </div>
      <Text htmlTag="h3">{eventData.name}</Text>
      <TabNav tabs={tabs} />

      {menuOpen && !isDeletion && 
        <Modal isShown={menuOpen} closeModal={() => toggleMenu()}>
          <div className="event__menu">
            {isJoined && !isOwner && 
              <Button onClick={() => onLeave()}>Kilépés</Button>
            }
            {isOwner && <Button onClick={() => onModify()}>Módosítás</Button>}
            {isOwner && <Button onClick={() => {setIsDeletion(true)}}>Törlés</Button>}     
          </div>
        </Modal>
      }
 
      {isDeletion && 
        <Modal isShown={isDeletion} closeModal={() => {setIsDeletion(!isDeletion)}}>
          <div className="event__deletion">
            <Dialog onAccept={onAcceptDelete} onDecline={() => {setIsDeletion(!isDeletion)}}>Biztos vagy benne, hogy törölni szeretnéd?</Dialog>
          </div>
        </Modal>
      }
    </div>
  );
}

export default Event;
