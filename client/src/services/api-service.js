import axios from 'axios';

export default class ApiService {
  constructor() {
    this.instance = axios.create({ baseURL: 'http://localhost:4000/api' });
  }

  get = (url, params = {}) => {
    return this.instance.get(`/${url}`, { params });
  };

  post = async (url, data = {})=> {
    return this.instance.post(`/${url}`, data);
  };
}
