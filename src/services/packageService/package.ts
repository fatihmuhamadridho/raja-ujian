import { instance } from "../../../toolkit/instance";

const apiClient = instance({
  baseURL: "/api/v1",
});

export class PackageService {
  static ApiEndpoint = {
    package: "/package",
  };

  static getAllPackage() {
    return apiClient.get(this.ApiEndpoint.package);
  }
}
