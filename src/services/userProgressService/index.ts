import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/api/v1/raja_ujian",
  headers: {
    Authorization: "Basic c3VwZXJhZG1pbjIxOnN1cGVyYWRtaW4yMQ==",
  },
});

export interface createUserProgressProps {
  list_choice?: string[];
  status?: string;
  score?: number;
  UserUserId?: number;
  RajaUjianPackageQuizPackageQuizId?: number;
}

export class UserProgressService {
  static ApiEndpoint = {
    user_progress: "/user_progress",
    start_progress: "/user_progress/start",
  };

  static getOne(user_id: number, package_quiz_id: number) {
    if (!user_id && !package_quiz_id) return undefined;
    return apiClient.get(
      this.ApiEndpoint.user_progress + `/${user_id}` + `/${package_quiz_id}`
    );
  }

  static postProgress(payload: createUserProgressProps) {
    return apiClient.post(this.ApiEndpoint.user_progress, payload);
  }

  static putProgress(
    user_progress_id: number,
    payload: createUserProgressProps
  ) {
    return apiClient.put(
      this.ApiEndpoint.user_progress + `/${user_progress_id}`,
      payload
    );
  }

  static startProgress(user_id: number, package_quiz_id: number) {
    if (!user_id && !package_quiz_id) return undefined;
    return apiClient.get(
      this.ApiEndpoint.start_progress + `/${user_id}` + `/${package_quiz_id}`
    );
  }
}

export const useGetOneUserProgress = (
  user_id: number,
  package_quiz_id: number
) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneUserProgress", user_id, package_quiz_id],
    fetchAction: async () =>
      UserProgressService.getOne(user_id, package_quiz_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
