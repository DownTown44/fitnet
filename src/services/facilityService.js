import axios from '../axios';

const getFacilities = async () => {
  try {
    const res = await axios.get('/facilities');
    return res.data;
  } catch (err) {
    return [];
  }
}

const getFacilityById = async (id) => {
  try {
    const res = await axios.get(`/facilities/${id}`);
    return res.data;
  } catch (err) {
    return null;
  }
}

export {
  getFacilities,
  getFacilityById
}
