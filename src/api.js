import Axios from 'axios';

class Api {
  constructor() {
    this.axios = Axios.create({
      baseURL: 'http://localhost:3000/',
    });
  }

  getTasks() {
    return this.axios.get();
  }

  createTask(data) {
    return this.axios.post(data);
  }

  updateTask(id, data) {
    return this.axios.put(`/${id}`, data);
  }
}
export default new Api();
