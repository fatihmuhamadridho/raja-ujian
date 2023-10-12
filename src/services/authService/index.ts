import useQuery from "@/libs/useQuery";
import axios from "axios";
import { instance } from "@/libs/instance";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/api/v1/auth",
});
const tokenClient = instance({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/api/v1/auth",
});

export interface loginProps {
  username: string;
  password: string;
}

export class AuthService {
  static ApiEndpoint = {
    privilege: "/privilege",
    login: "/login",
  };

  static privilege() {
    return tokenClient.get(this.ApiEndpoint.privilege);
  }

  static login(payload: loginProps) {
    return apiClient.post(this.ApiEndpoint.login, payload);
  }
}
