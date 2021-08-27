import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getEventById, deleteEventById } from '../services/eventService';
import { getEventUsers } from '../services/userService';

import Text from './UI/Text';
import Button from './UI/Button';
import SearchUsers from './Search/SearchUsers';
import UserList from './UserList/UserList';
import Modal from './UI/Modal';
import Dialog from './Dialog/Dialog';

const Event = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isDeletion, setIsDeletion] = useState(false);
  const [eventData, setEventData] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [actionDetails, setActionDetails] = useState({
    type: "event",
    id: null
  });

  const { id } = useParams();
  const history = useHistory();

  // Sending request to ge data and participants of event
  useEffect(() => {
    (async () => {
      const [eventRes, usersRes] = await Promise.all([getEventById(id), getEventUsers(id)])
      setEventData(eventRes);
      setUsersData(usersRes);
    })();
  }, []);

  // If user is the owner, then he can invite users
  useEffect(() => {
    if (!isOwner) {
      const userData = sessionStorage.getItem("userData");
  
      if (JSON.parse(userData).userId === eventData.userId) {
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

  const onAcceptClick = async () => {
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

      {isOwner && <Button onClick={() => setShowSearch(!showSearch)}>Invite users</Button>}
      {showSearch &&
        <SearchUsers 
          invitable={true} 
          actionDetails={actionDetails} 
          parentRerender={onUserListChange}
          members={usersData}
        />
      }
      {isOwner ? 
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
          <Dialog onAccept={onAcceptClick} onDecline={() => {setIsDeletion(!isDeletion)}}>Biztos vagy benne, hogy törölni szeretnéd?</Dialog>
        </Modal>
      }
    </div>
  );
}

export default Event;
