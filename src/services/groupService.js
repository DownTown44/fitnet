import axios from '../axios';

const createGroup = async (groupData) => {
  try {
    const res = await axios.post('/groups', groupData, {headers: {'Content-Type': `multipart/form-data`}});
    
    return res.data;
  } catch(err) {
    return false;
  }
}

const getGroups = async () => {
  try {
    const res = await axios.get('/groups');
    return res.data;
  } catch (err) {
    return [];
  }
}

const getGroupById = async (id) => {
  try {
    const res = await axios.get(`/groups/${id}`);
    return res.data;
  } catch (err) {
    return null;
  }
}

export {
  createGroup,
  getGroups,
  getGroupById
};
