import axios from '../axios';
import Cookies from 'js-cookie';

export const login = async (loginData) => {
  try {
    const res = await axios.post('/login', loginData);
    Cookies.set("token", res.data.token);
    return res.data.auth;
  } catch(err) {
    return false;
  }
}

// export default login;
