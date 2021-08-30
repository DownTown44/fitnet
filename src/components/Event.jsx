import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getEventUsers, getEventMember, joinUserToEvent, userLeaveEvent } from '../services/userService';
import { getEventById, deleteEventById } from '../services/eventService';

import Text from './UI/Text';
import Button from './UI/Button';
import SearchUsers from './Search/SearchUsers';
import UserList from './UserList/UserList';
import Modal from './UI/Modal';
import Dialog from './Dialog/Dialog';

const Event = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isDeletion, setIsDeletion] = useState(false);
  const [eventData, setEventData] = useState({});
  // usersData = participantsData
  const [usersData, setUsersData] = useState([]);
  const [actionDetails, setActionDetails] = useState({
    type: "event",
    id: null
  });

  const { id } = useParams();
  const history = useHistory();

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
    if (!isOwner) {
      if (userData.userId === eventData.userId) {
        setIsOwner(true);
        setActionDetails((prevProps) => {return {...prevProps, id: eventData.eventId}});
      } 
    }
  }, [eventData]);

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

  return (
    <div className="center">
      <Text htmlTag="h2">{eventData.name}</Text>
      <Text htmlTag="p">{eventData.description}</Text>
      <Text htmlTag="p">{eventData.address}</Text>
      <Text htmlTag="p">{`Minimum: ${eventData.minParticipant}`}</Text>
      <Text htmlTag="p">{`Maximum: ${eventData.maxParticipant}`}</Text>
      <Text htmlTag="p">{`Kezdő időpont: ${eventData.startDate}`}</Text>
      <Text htmlTag="p">{`Befejezési időpont: ${eventData.endDate}`}</Text>
      <Text htmlTag="p">{eventData.endDate === 1 ? "Ismétlődő esemény" : "Egyszeri esemény"}</Text>
      <Text htmlTag="p">{eventData.type}</Text>
      {eventData.accessibilityId !== 2 && !isJoined && !isOwner && <Button onClick={() => onJoin()}>Csatlakozás</Button>}
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
      {isOwner && <Button onClick={() => {setIsDeletion(true)}}>Törlés</Button>}
      {
        isDeletion && 
        <Modal isShown={isDeletion} closeModal={() => {setIsDeletion(!isDeletion)}}>
          <Dialog onAccept={onAcceptDelete} onDecline={() => {setIsDeletion(!isDeletion)}}>Biztos vagy benne, hogy törölni szeretnéd?</Dialog>
        </Modal>
      }
      {isJoined && !isOwner && <Button onClick={() => onLeave()}>Kilépés</Button>}
    </div>
  );
}

export default Event;
