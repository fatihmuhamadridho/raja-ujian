import { instance } from "../../../toolkit/instance";

export interface optionalProps {
  params: any;
}
export interface paramsUserProps extends Omit<optionalProps, "params"> {
  params: {
    user_id?: string;
  };
  [key: string]: any;
}
export interface userModelProps {
  user_id?: string;
  username?: string;
  password?: string;
  access_token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const apiClient = instance({
  baseURL: "http://localhost:4000/api/v1",
  headers: { Authorization: "Basic " + process.env.NEXT_PUBLIC_BASIC_AUTHENTICATION },
});

export class UserService {
  static ApiEndpoint = {
    user: "/user",
  };

  static getAllUser() {
    return apiClient.get(this.ApiEndpoint.user);
  }

  static getOneUser({ params: { user_id } }: paramsUserProps) {
    return apiClient.get(this.ApiEndpoint.user + `/${user_id}`);
  }

  static postUser(payload: userModelProps) {
    return apiClient.post(this.ApiEndpoint.user, payload);
  }

  static putUser(payload: userModelProps, { params: { user_id } }: paramsUserProps) {
    return apiClient.put(this.ApiEndpoint.user + `/${user_id}`, payload);
  }

  static deleteUser({ params: { user_id } }: paramsUserProps) {
    return apiClient.delete(this.ApiEndpoint.user + `/${user_id}`);
  }
}
