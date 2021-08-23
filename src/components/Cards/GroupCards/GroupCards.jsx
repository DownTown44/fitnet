import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getGroups } from '../../../services/groupService';
import Text from '../../UI/Text';
import GroupCard from './GroupCard';

const GroupCards = () => {
  const [groups, setGroups] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      setGroups(await getGroups());
    })();
  }, []);

  return (
    <div className="center">
      {groups.length !== 0 ? groups.map((element) => {
        return (
          <GroupCard
            key={element.groupId}
            src="noImage"
            alt="group"
            title={element.name}
            buttonText="Megnyitás"
            onOpen={() => history.push(`/groups/${element.groupId}`)}
            onClick={() => console.log("Group button clicked")}
          />
        );
      }) : <Text>There are no groups</Text> }
    </div>
  );
}

export default GroupCards;
