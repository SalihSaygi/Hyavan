import axios from 'axios';

const axi = axios.create({
  baseURL: 'http://localhost:3050',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
});

export default axi;
