import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.43.209:4000/api/';

const http = axios.create();

export default http;
