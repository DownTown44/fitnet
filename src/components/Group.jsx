import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getGroupById } from '../services/groupService';
import Text from './UI/Text';

const Group = () => {
  const [groupData, setGroupData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getGroupById(id).then((res) => {
      setGroupData(res);
    });
  }, []);

  return (
    <div className="center">
      <Text htmlTag="h3">{groupData.name}</Text>
      <Text>{groupData.description}</Text>
      <img src={`http://localhost:8080/${groupData.picture}`}/>
    </div>
  );
}

export default Group;
