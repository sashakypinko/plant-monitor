import ApiService from "./api-service";

class MonitorService extends ApiService {
  getAll = async ()=> {
    return await this.get('monitors').then((res) => res.data);
  };

  update = async (id, data) => {
    return await this.post(`monitors/${id}`, data, false).then((res) => res.data);
  };
}

export const MonitorApi = new MonitorService();
