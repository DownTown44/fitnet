import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getEventById } from '../services/eventService';
import { getEventUsers } from '../services/userService';

import Text from './UI/Text';
import Button from './UI/Button';
import SearchUsers from './Search/SearchUsers';
import UserList from './UserList/UserList';

const Event = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [eventData, setEventData] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [inviteDetails, setInviteDetails] = useState({
    type: "event",
    id: null
  });

  const { id } = useParams();

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
        setInviteDetails((prevProps) => {return {...prevProps, id: eventData.eventId}});
      } 
    }
  }, [eventData]);

  const onInvite = async () => {
    // This will rerender the userlist after an invitation
    const usersRes = await getEventUsers(id);
    setUsersData(usersRes);
  };

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
          inviteDetails={inviteDetails} 
          parentRerender={onInvite}
          members={usersData}
        />
      }

      <UserList users={usersData}></UserList>
    </div>
  );
}

export default Event;
