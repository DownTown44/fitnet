import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

import { getEvents } from '../../../services/eventService';
import { getUsersGroups } from '../../../services/groupService';
import Text from '../../UI/Text';
import EventCard from './EventCard';
import Button from '../../UI/Button';
import TopNav from '../../Navigation/TopNav';

import basketball_field from '../../../assets/eventImages/basketball-field.jpg';
import basketball from '../../../assets/eventImages/basketball.jpg';
import football_field from '../../../assets/eventImages/football-field.jpg';
import football from '../../../assets/eventImages/football.jpg';
import sport_kit from '../../../assets/eventImages/sport-kit.jpg';
import table_tennis from '../../../assets/eventImages/table-tennis.jpg';
import tennis_racket from '../../../assets/eventImages/tennis-racket.jpg';


const EventCards = (props) => {
  const [events, setEvents] = useState([]);
  const [groupIds, setGroupIds] = useState([]);
  const history = useHistory();

  const images = [basketball_field, basketball, football_field, football, sport_kit, table_tennis, tennis_racket];

  Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }

  const userData = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
    if (userData) {
      getUsersGroups(userData.userId).then((result) => {
        setGroupIds(result);
      });
    }
    if (!props.calendarEvents) {
      getEvents(props.groupId).then((result) => {
        setEvents(result);
      });
    }
  }, []);

  useEffect(() => {
    if (props.events) {
      setEvents(props.events);
    }
  }, [props.events]);

  // Checks if the user is member of the group that created the event
  const isMember = (groupId, groupIdList) => {
    return groupIdList.includes(groupId);
  }

  return (
    <div className="event-cards">
      {!props.hideNav &&
        <>
          <TopNav 
            to="/"
            title="Események"
            iconName="search"/>
          <Button additionalClass="button-normal--iconed" isDisabled={!userData} onClick={() => history.push('events/create')}>
            Esemény
            <Icon>add</Icon>
          </Button>
        </>
      }
      <Text htmlTag="h3">Összes esemény</Text>
      <div className="event-cards__cards">
        {events.length !== 0 ? events.map((element) => {
          if (element.accessibility === 'public' ||
            element.accessibility === 'private' ||
            isMember(element.groupId, groupIds)) {
              const image = images.random()
              return (
                <EventCard
                  id={element.eventId}
                  isPrivate={element.accessibility === 'private'}
                  key={element.eventId}
                  title={element.name}
                  date={element.startDate}
                  address={element.address}
                  image={image}
                  onOpen={() => history.push({pathname: `/events/${element.eventId}`, state: image})}
                />
              );
          }
        }) : <Text>Nincsenek események</Text>}
      </div>
    </div>
  );
};

EventCards.propTypes = {
  groupId: PropTypes.number
}

EventCards.defaultProps = {
  groupId: null
}

export default EventCards;
