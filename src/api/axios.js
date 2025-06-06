
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://blog-server-two-rho.vercel.app/api', 
});

export default instance;
