import { instance } from "../../../toolkit/instance";

const apiClient = instance({
  baseURL: process.env.NEXT_PUBLIC_FATIHMUHAMADRIDHO_ADMIN_API + "/api/v1",
});

export interface loginProps {
  username: string;
  password: string;
}

export class AuthService {
  static ApiEndpoint = {
    privileges: "/auth/privileges",
    login: "/auth/login",
  };

  static getPrivileges() {
    return apiClient.get(this.ApiEndpoint.privileges).catch(error => console.clear());
  }

  static login(payload: loginProps) {
    return apiClient.post(this.ApiEndpoint.login, payload);
  }
}
