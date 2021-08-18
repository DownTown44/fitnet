import axios from '../axios';

const getAccessibilities = async () => {
  try {
    const res = await axios.get('/accessibilities');
    return res.data;
  } catch(err) {
    return false;
  }
}

export {
  getAccessibilities,
}
