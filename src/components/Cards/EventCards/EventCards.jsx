import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EventCard from './EventCard';

import { getEvents } from '../../../services/eventService';
import { elementType } from 'prop-types';

const EventCards = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      setEvents(await getEvents());
    })();
  }, []);

  const history = useHistory();
  return (
    <div>
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
      }) : <p>There are no elemnts</p>}
    </div>
  );
};

EventCards.propTypes = {

};

export default EventCards;
