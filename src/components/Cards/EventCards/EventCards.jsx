import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

import { getEvents } from '../../../services/eventService';
import Text from '../../UI/Text';
import EventCard from './EventCard';
import { getUsersGroups } from '../../../services/groupService';
import NavButton from '../../UI/NavButton';
import Button from '../../UI/Button';

const EventCards = (props) => {
  const [events, setEvents] = useState([]);
  const [groupIds, setGroupIds] = useState([]);
  const history = useHistory();
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
      <div className="event-cards__control">
        <NavButton to="/" icon="arrow_back">Események</NavButton>
        <Icon>search</Icon>
      </div>
      <Button additionalClass="button-normal--iconed" isDisabled={!userData} onClick={() => history.push('events/create')}>
        Esemény
        <Icon>add</Icon>
      </Button>
      <Text htmlTag="h3">Összes esemény</Text>
      <div className="event-cards__cards">
        {events.length !== 0 ? events.map((element) => {
          if (element.accessibility === 'public' ||
            element.accessibility === 'private' ||
            isMember(element.groupId, groupIds)) {
              return (
                <EventCard
                  id={element.eventId}
                  isPrivate={element.accessibility === 'private'}
                  key={element.eventId}
                  title={element.name}
                  date={element.startDate}
                  address={element.address}
                  onOpen={() => history.push(`/events/${element.eventId}`)}
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
