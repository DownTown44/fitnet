import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import EventCard from '../Cards/EventCards/EventCard';
import Text from '../UI/Text';

const FilteredEvents = (props) => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    props.filterType().then((res) => {
      setEvents(res)
    });
  }, []);

  return (
    <div>
      <Text htmlTag={"h2"}>{props.children}</Text>
      {events.length !== 0 ? events.map((element) => {
        return (
          <EventCard
            key={element.eventId}
            src="noImage"
            alt="event"
            title={element.name}
            date={element.startDate}
            address={element.address}
            buttonText="Csatlakozás"
            onOpen={() => history.push(`/events/${element.eventId}`)}
            onClick={() => console.log("Event button clicked")}
          />
        );
      }) : <Text>{props.altText}</Text>}
    </div>
  );
}

FilteredEvents.propTypes = {
  filterType: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  altText: PropTypes.string.isRequired
}

export default FilteredEvents;
