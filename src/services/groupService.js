import axios from '../axios';

const createGroup = async (groupData) => {
  try {
    const res = await axios.post('/groups', groupData, {headers: {'Content-Type': `multipart/form-data`}});
    return res.data.created;
  } catch(err) {
    return false;
  }
}

export {
  createGroup
};
