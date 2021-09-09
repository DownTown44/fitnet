import axios from '../axios';
import Cookies from 'js-cookie';

const login = async (loginData) => {
  try {
    const res = await axios.post('/login', loginData);
    Cookies.set('token', res.data.token, {
      // TODO: In production ready secure need to be true
      // Secure false because served over http, not https
      secure: false,
    });
    return res.data;
  } catch(err) {
    return false;
  }
}

const logout = async () => {
  // We remove the token cookie on backend, so we dont need here
  try {
    const res = await axios.get('/logout');
    sessionStorage.clear();
    return res.data.logout;
  } catch (err) {
    return false;
  }
}

const signup = (signUpData) => {
  axios.post('/signup', signUpData);
}

export {
  login,
  logout,
  signup
};
