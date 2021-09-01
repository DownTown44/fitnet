import React from 'react';

import DoubleButton from './UI/DoubleButton';

const UserNavigation = () => {
  return (
    <div className="user-navigation">
      <DoubleButton path="facilities">Sportlétesítmények</DoubleButton>
      <DoubleButton path="events">Események</DoubleButton>
      <DoubleButton path="groups">Csoportok</DoubleButton>
    </div>
  );
};

export default UserNavigation;
