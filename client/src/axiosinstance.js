import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3330'
});

export default instance;
