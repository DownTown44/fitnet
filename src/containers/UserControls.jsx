import React from 'react';
import UserNavigation from '../components/UserNavigation';

const UserControls = (props) => {
  return (
    <div className="user-controls">
      <div>
        <UserNavigation/>
      </div>
      <div>
        User notifications
      </div>
    </div>
  );
}

export default UserControls;
