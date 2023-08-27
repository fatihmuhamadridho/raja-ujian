import { instance } from "../../../toolkit/instance";

const apiClient = instance({
  baseURL: "/api/v1",
});

export class UserProgressService {
  static ApiEndpoint = {
    user_progress: "/user_progress",
  };

  static getAllUserProgress() {
    return apiClient.get(this.ApiEndpoint.user_progress);
  }

  static getOneUserProgress(query: { userId: string; packageId: string }) {
    const { userId, packageId } = query;
    return apiClient.get(this.ApiEndpoint.user_progress + `/${userId}` + `/${packageId}`);
  }
}
