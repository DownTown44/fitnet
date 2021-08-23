import axios from '../axios';

const getUsers = async (searchString) => {
  try {
    const res = await axios.get('/users', { params: { searchString: searchString } });
    return res.data;
  } catch (err) {
    return [];
  }
}

export {
  getUsers,
}
