import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getEventMember, joinUserToEvent, userLeaveEvent } from '../../../services/userService';

import Text from '../../UI/Text';
import Button from '../../UI/Button';

import Icon from '@material-ui/core/Icon';

import basketball_field from '../../../assets/eventImages/basketball-field.jpg';
import basketball from '../../../assets/eventImages/basketball.jpg';
import football_field from '../../../assets/eventImages/football-field.jpg';
import football from '../../../assets/eventImages/football.jpg';
import sport_kit from '../../../assets/eventImages/sport-kit.jpg';
import table_tennis from '../../../assets/eventImages/table-tennis.jpg';
import tennis_racket from '../../../assets/eventImages/tennis-racket.jpg';


const EventCard = (props) => {
  const [isJoined, setIsJoined] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
    getEventMember(userData.userId, props.id).then((res) => {
      setIsJoined(res);
    });
  }, [])

  const images = [basketball_field, basketball, football_field, football, sport_kit, table_tennis, tennis_racket];

  Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }

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
          <img src={images.random()} alt="event" />
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
          isDisabled={props.isPrivate}
          onClick={() => onJoin()}
        >
          {props.isPrivate ? <Icon>lock</Icon> : <Icon>add</Icon>}
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
