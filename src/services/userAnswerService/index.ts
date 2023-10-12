import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/api/v2/raja_ujian",
  headers: {
    Authorization: "Basic c3VwZXJhZG1pbjIxOnN1cGVyYWRtaW4yMQ==",
  },
});

export interface createUserAnswer {
  user_answer: string;
  RajaUjian2TryoutSessionTryoutSessionId: number;
  RajaUjian2QuizQuizId: number;
}

export class UserAnswerService {
  static ApiEndpoint = {
    user_answer: "/user_answer",
  };

  static getOne(user_answer_id: number) {
    return apiClient.get(this.ApiEndpoint.user_answer + `/${user_answer_id}`);
  }

  static getOneSessionQuiz(tryout_session_id: number, quiz_id: number) {
    return apiClient.get(this.ApiEndpoint.user_answer);
  }

  static putUserAnswer(user_answer_id: number, user_answer?: string | null) {
    return apiClient.put(this.ApiEndpoint.user_answer + `/${user_answer_id}`, {
      user_answer,
    });
  }
}

export const useGetOneSessionQuiz = (
  tryout_session_id: number,
  quiz_id: number
) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneSessionQuiz", tryout_session_id, quiz_id],
    fetchAction: async () =>
      UserAnswerService.getOneSessionQuiz(tryout_session_id, quiz_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
