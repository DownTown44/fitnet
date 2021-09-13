import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getEvents } from '../../../services/eventService';
import Text from '../../UI/Text';
import EventCard from './EventCard';
import { getUsersGroups } from '../../../services/groupService';

const EventCards = (props) => {
  const [events, setEvents] = useState([]);
  const [groupIds, setGroupIds] = useState([]);
  const history = useHistory();
  let userData;

  useEffect(() => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
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
    <div className={props.calendarEvents ? '' : "center"}>
      {events.length !== 0 ? events.map((element) => {
        if (element.accessibility === 'public' ||
          element.accessibility === 'private' ||
          isMember(element.groupId, groupIds)) {
            return (
              <EventCard
                id={element.eventId}
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
  );
};

EventCards.propTypes = {
  groupId: PropTypes.number
}

EventCards.defaultProps = {
  groupId: null
}

export default EventCards;
