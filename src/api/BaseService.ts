import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && window.location.pathname === '/profile') {
      localStorage.removeItem('tokenUser');
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    }
  },
);

export default axios;
