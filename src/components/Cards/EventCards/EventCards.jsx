import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getEvents } from '../../../services/eventService';
import Text from '../../UI/Text';
import EventCard from './EventCard';

const EventCards = () => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      setEvents(await getEvents());
    })();
  }, []);

  return (
    <div className="center">
      {events.length !== 0 ? events.map((element) => {
        return (
          <EventCard
            key={element.eventId}
            title={element.name}
            date={element.startDate}
            address={element.address}
            buttonText="Csatlakozás"
            onOpen={() => history.push(`/events/${element.eventId}`)}
          />
        );
      }) : <Text>There are no events</Text>}
    </div>
  );
};

export default EventCards;
