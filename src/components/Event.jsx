import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getEventById } from '../services/eventService';

import Text from './UI/Text';

const Event = () => {
  const [eventData, setEventData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setEventData(await getEventById(id));
      console.log(eventData);
    })()
  }, []);

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
    </div>
  );
}

export default Event;
