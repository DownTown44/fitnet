import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

instance.interceptors.response.use((res) => res, (error) => {
  const { status } = error.response;
  if (status === 403) {
    sessionStorage.clear();
    window.location.reload();
  }
});

export default instance;
