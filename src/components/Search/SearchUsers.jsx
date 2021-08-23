import React, { useState, useEffect } from 'react';

import { getUsers } from '../../services/searchService';
import Input from '../UI/Input';

const SearchUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    if (searchField.length >= 3) {
      // Make it async
      getUsers(searchField);
    }
  }, [searchField]);

  return (
    <div>
      <Input 
        type="text"
        placeholder="Keresés" 
        value={searchField}
        onChange={(event) => setSearchField(event.target.value)}
        ></Input>
    </div>
  );
}

export default SearchUsers;
