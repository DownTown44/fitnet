import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getEvents } from '../../../services/eventService';

const EventCards = (props) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      setEvents(await getEvents());
    })();
  }, []);

  return (
    <div>
      
    </div>
  );
};

EventCards.propTypes = {

};

export default EventCards;
