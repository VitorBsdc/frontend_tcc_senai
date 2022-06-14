import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: config.apiURL,
});

export default class Service {
  getBaseURL() {
    return api.getUri();
  }

  async login(body) {
    const response = await api.post("/login", body);
    return response.data;
  }

  async listUsers() {
    const response = await api.get("/user-list");

    return response;
  }

  async registerUser(requestingId, body, headers) {
    const response = await api.post(`/user-create/${requestingId}`, body, {
      headers: headers,
    });
    return response.data;
  }

  async editUser(requestingId, targetId, body, headers) {
    const response = await api.patch(
      `/user-update/${requestingId}/${targetId}`,
      body,
      { headers: headers }
    );

    return response.data;
  }

  async deleteUser(requestingId, targetId, headers) {
    const response = await api.delete(
      `/delete-user/${requestingId}/${targetId}`,
      { headers: headers }
    );
    return response.data;
  }

  async validToken(token, callback) {
    const response = await api.get("/auth", {
      headers: {
        accessToken: token,
      },
    });
    const data = response.data;

    if (data.hasOwnProperty("error")) {
      callback();
      return false;
    } else {
      return true;
    }
  }

  async statusMachine(start) {
    const { data } = await api.post(`/status/${start}`);
    return data.message;
  }

  async machineList() {
    const  response  = await api.get("/maquina-list");
    
    return response.data;
  }

  async lastInfo() {
    const response = await api.get("/final-info");

    return response.data;
  }

  async pdfInfo() {
    const response = await api.get("/pdf-info");

    return response.data;
  }
}
