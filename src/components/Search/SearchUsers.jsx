import React, { useState, useEffect } from 'react';

import { getUsers } from '../../services/searchService';
import Input from '../UI/Input';
import UserList from '../UserList/UserList';

const SearchUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchField, setSearchField] = useState('');

  // Sending the request if enough characters are present in search bar
  useEffect(() => {
    if (searchField.length === 3) {
      getUsers(searchField).then((res) => {
        // Search result filtering
        // Filtering out the users who are already have been added to event/group
        // also filtering out the owner (the user who is logged in)
        // Logged in userData
        const loggedInUser = JSON.parse(sessionStorage.getItem("userData"))
        setUsers(res.filter((user) => {
          // props.members is the parent components userList
          // This returns undefined when it doesn't finds the user (it can be added to search results)
          const find = props.members.find(({userId}) => userId === user.userId);
          // If user is not in props.members and the user is not the owner then 
          // it can be added to search results
          if (find === undefined && user.userId !== loggedInUser.userId) {
            return true;
          }
        }));
      });
    } else if (searchField.length < 3) {
      setUsers([]);
    };
  }, [searchField, props.members]);

  // Setting users based on search results and optimizing search
  useEffect(() => {
    setFilteredUsers([])
    if (searchField.length >= 3) {
      // Filtering users by search value (name of user)
      setFilteredUsers(users.filter((user) => {
        const firstLastName = `${user.firstName} ${user.lastName}`;
        const lastFirstName = `${user.lastName} ${user.firstName}`;
        const regex = new RegExp(searchField, "i");

        if (firstLastName.match(regex) || lastFirstName.match(regex)) {
          return true;
        }
      }));
    };
  }, [searchField, users]);

  return (
    <div>
      <Input 
        type="text"
        placeholder="Keresés" 
        value={searchField}
        onChange={(event) => setSearchField(event.target.value)}
      ></Input>
      <UserList 
        users={filteredUsers} 
        invitable={props.invitable} 
        inviteDetails={props.inviteDetails}
        parentRerender={props.parentRerender}/>
    </div>
  );
}

export default SearchUsers;
