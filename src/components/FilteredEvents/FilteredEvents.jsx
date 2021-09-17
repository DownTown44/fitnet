import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import EventCard from '../Cards/EventCards/EventCard';
import Text from '../UI/Text';

import basketball_field from '../../assets/eventImages/basketball-field.jpg';
import basketball from '../../assets/eventImages/basketball.jpg';
import football_field from '../../assets/eventImages/football-field.jpg';
import football from '../../assets/eventImages/football.jpg';
import sport_kit from '../../assets/eventImages/sport-kit.jpg';
import table_tennis from '../../assets/eventImages/table-tennis.jpg';
import tennis_racket from '../../assets/eventImages/tennis-racket.jpg';


const FilteredEvents = (props) => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  const images = [basketball_field, basketball, football_field, football, sport_kit, table_tennis, tennis_racket];

  Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }
  
  useEffect(() => {
    props.filterType().then((res) => {
      setEvents(res)
    });
  }, []);

  return (
    <div className="filtered-events">
      <Text htmlTag={"h2"}>{props.children}</Text>
      {events.length !== 0 ? events.map((element) => {
        const image = images.random();
        return (
          <EventCard
            key={element.eventId}
            src="noImage"
            alt="event"
            title={element.name}
            date={element.startDate}
            address={element.address}
            buttonText="Csatlakozás"
            image={image}
            onOpen={() => history.push({pathname: `/events/${element.eventId}`, state: image})}
          />
        );
      }) : <Text htmlTag="h1">{props.altText}</Text>}
    </div>
  );
}

FilteredEvents.propTypes = {
  filterType: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  altText: PropTypes.string.isRequired
}

export default FilteredEvents;
