import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getEventMember, joinUserToEvent, userLeaveEvent } from '../../../services/userService';

import Text from '../../UI/Text';
import Button from '../../UI/Button';

import Icon from '@material-ui/core/Icon';

const EventCard = (props) => {
  const [isJoined, setIsJoined] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
    if (userData) {
      getEventMember(userData.userId, props.id).then((res) => {
        setIsJoined(res);
      });
    }
  }, [])

  const fromattedDate = {
    year: '',
    month: '',
    day: ''
  }

  if (props.date) {
    const date = props.date.split(' ')[0];
    const [year, month, day] = date.split('/');
    fromattedDate.year = year;
    fromattedDate.month = month;
    fromattedDate.day = day;
  }

  const onJoin = async () => {
    const result = await joinUserToEvent(userData.userId, props.id);
    
    if (result.success) {
      setIsJoined(true);
    }
  }

  const onLeave = async () => {
    const result = await userLeaveEvent(userData.userId, props.id);

    if (result.success) {
      setIsJoined(false);
    }
  }

  // TODO: show user icons like in design
  return (
    <div className="event-card">
      <div onClick={props.onOpen}>
        <div className="event-card__image-container">
          <div className="event-card__date">
            <Text className="event-card__date--big" htmlTag="p">{fromattedDate.day}</Text>
            <Text className="event-card__date--small" htmlTag="p">{fromattedDate.month}</Text>
          </div>
          <div className="event-card__bookmark">
            {/*TODO: bookmark logic */}
            <Icon>bookmark_border</Icon>
          </div>
          <img src={props.image} alt="event" />
        </div>
        
        <Text htmlTag="h3">{props.title}</Text>
      </div>
      <div className="event-card__join">
        <Icon className="event-card__join-location">place</Icon>
        <Text htmlTag="p">{props.address}</Text>
        {isJoined ?
        <Button
          additionalClass="icon-button icon-button--card"
          onClick={() => onLeave()}
        >
          {<Icon>done</Icon>}
        </Button> :
        <Button
          additionalClass="icon-button icon-button--card"
          isDisabled={props.isPrivate || !userData}
          onClick={() => onJoin()}
        >
          {props.isPrivate || !userData ? <Icon>lock</Icon> : <Icon>add</Icon>}
        </Button>
      }
      </div>
    </div>
  );
}

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
}

export default EventCard;
