import React, { useState, useEffect } from 'react';

import { getUsers } from '../../services/searchService';
import Input from '../UI/Input';
import UserList from '../UserList/UserList';

const SearchUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    if (searchField.length === 3) {
      getUsers(searchField).then((res) => {
        setUsers(res);
      });
    } else if (searchField.length < 3) {
      setUsers([]);
    };
  }, [searchField]);

  useEffect(() => {
    setFilteredUsers([])
    if (searchField.length >= 3) {
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
      <UserList users={filteredUsers}/>
    </div>
  );
}

export default SearchUsers;
