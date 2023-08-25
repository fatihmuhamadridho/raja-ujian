import { instance } from "../../../toolkit/instance";

const apiClient = instance({
  baseURL: "https://fakestoreapi.com",
});

export class BaseService {
  static ApiEndpoint = {
    base: "/products",
  };

  static getAlllBase() {
    return apiClient.get(this.ApiEndpoint.base);
  }
}
