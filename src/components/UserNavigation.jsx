import React from 'react';

import DoubleButton from './UI/DoubleButton';

const UserNavigation = () => {
  return (
    <div>
      <DoubleButton path="events">Események</DoubleButton>
      <DoubleButton path="groups">Csoportok</DoubleButton>
    </div>
  );
};

export default UserNavigation;
