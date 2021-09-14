import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

import { getGroupMember, joinUserToGroup, userLeaveGroup } from '../../../services/userService';
import Text from '../../UI/Text';
import Button from '../../UI/Button';

const GroupCard = (props) => {
  const [isJoined, setIsJoined] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
    getGroupMember(userData.userId, props.id).then((res) => {
      setIsJoined(res);
    });
  }, [])

  const onJoin = async() => {
    const result = await joinUserToGroup(userData.userId, props.id);

    if (result.success) {
      setIsJoined(true);
    }
  }

  const onLeave = async () => {
    const result = await userLeaveGroup(userData.userId, props.id);

    if (result.success) {
      setIsJoined(false);
    }
  }

  return (
    <div className="group-card">
      <div onClick={props.onOpen}>
        <div className="group-card__image-container">
          <img src={props.src} alt="group" />
        </div>
        <Text htmlTag="h3">{props.title}</Text>
      </div>
      <div className="group-card__join">
        <Icon className="group-card__join-tags">filter_list</Icon>
        {/* TODO: we need to use real tags later */}
        <Text htmlTag="p">#sport #fitness +2más</Text>
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

GroupCard.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired
}


export default GroupCard;
