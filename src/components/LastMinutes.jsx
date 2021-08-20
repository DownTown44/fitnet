import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getLastMinuteEvents } from '../services/feedService';
import EventCard from './Cards/EventCards/EventCard';
import Text from './UI/Text';

const LastMinutes = () => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getLastMinuteEvents().then((res) => {
      setEvents(res)
    });
  }, []);

  return (
    <div>
      <Text htmlTag={"h2"}>Közelgő események</Text>
      {events.length !== 0 ? events.map((element) => {
        return (
          <EventCard
            key={element.eventId}
            title={element.title}
            date={element.startDate}
            address={element.address}
            buttonText="Csatlakozás"
            onOpen={() => history.push(`/events/${element.eventId}`)}
          />
        );
      }) : <Text>Nincsenek közelgő események</Text>}
    </div>
  );
}

export default LastMinutes;
