import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/api/v2/raja_ujian",
  headers: {
    Authorization: "Basic c3VwZXJhZG1pbjIxOnN1cGVyYWRtaW4yMQ==",
  },
});

export interface createTryoutSessionService {
  quiz_order?: any;
  quiz_active?: number;
  user_progress?: any;
  UserUserId?: number;
  RajaUjian2PackageQuizPackageQuizId?: number;
}

export class TryoutSessionService {
  static ApiEndpoint = {
    tryout_session: "/tryout_session",
  };

  static getAllByUser(user_id: number) {
    return apiClient.get(
      this.ApiEndpoint.tryout_session + "/active-tryout" + `/${user_id}`
    );
  }

  static getOne(tryout_session_id: number) {
    return apiClient.get(
      this.ApiEndpoint.tryout_session + `/${tryout_session_id}`
    );
  }

  static putTryout(
    tryout_session_id: number,
    payload: createTryoutSessionService
  ) {
    return apiClient.put(
      this.ApiEndpoint.tryout_session + `/${tryout_session_id}`,
      payload
    );
  }

  static deleteTryout(tryout_session_id: number) {
    return apiClient.delete(
      this.ApiEndpoint.tryout_session + `/${tryout_session_id}`
    );
  }

  static startTryout(payload: {
    UserUserId: number;
    RajaUjian2PackageQuizPackageQuizId: number;
  }) {
    return apiClient.post(
      this.ApiEndpoint.tryout_session + "/start-tryout",
      payload
    );
  }

  static finishTryout(
    tryout_session_id: number,
    RajaUjian2PackageQuizPackageQuizId: number
  ) {
    return apiClient.post(
      this.ApiEndpoint.tryout_session + `/finish-tryout/${tryout_session_id}`,
      { RajaUjian2PackageQuizPackageQuizId }
    );
  }
}

export const useGetAllTryoutSessionByUser = (user_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllTryoutSessionByUser", user_id],
    fetchAction: async () => TryoutSessionService.getAllByUser(user_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOneTryoutSession = (tryout_session_id: number) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneTryoutSession", tryout_session_id],
    fetchAction: async () => TryoutSessionService.getOne(tryout_session_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
