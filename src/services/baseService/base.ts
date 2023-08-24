import { instance } from "../../../toolkit/instance";

const apiClient = instance({
  baseURL: "/api/v1",
});

export class BaseService {
  static ApiEndpoint = {
    base: "/base",
  };

  static getAlllBase() {
    return apiClient.get(this.ApiEndpoint.base);
  }
}
