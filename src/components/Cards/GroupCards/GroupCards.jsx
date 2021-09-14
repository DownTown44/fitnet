import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getGroups } from '../../../services/groupService';
import Text from '../../UI/Text';
import GroupCard from './GroupCard';

const GroupCards = () => {
  const [groups, setGroups] = useState([]);
  const history = useHistory();
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
    getGroups().then((res) => {
      setGroups(res);
    })
  }, []);

  // Checking if user is member of group
  // so he can see invisible ones where he is a member
  const isMember = (userId, group) => {
    for (const member of group.members) {
      if (userId === member.user_id) {
        return true
      }
    }

    return false;
  }

  return (
    <div className="center">
      {groups.length !== 0 ? groups.map((element) => {
        if (element.accessibility === 'public' ||
            element.accessibility === 'private' ||
            element.userId === userData.userId ||
            isMember(userData.userId, element)) {

          console.log(element);
          return (
            <GroupCard
              id={element.groupId}
              key={element.groupId}
              isPrivate={element.accessibility === 'private'}
              src={`http://localhost:8080/${element.picture}`}
              title={element.name}
              buttonText="Megnyitás"
              onOpen={() => history.push(`/groups/${element.groupId}`)}
              onClick={() => console.log("Group button clicked")}
            />
          );
        }
      }) : <Text>Nincsenek csoportok</Text> }
    </div>
  );
}

export default GroupCards;
