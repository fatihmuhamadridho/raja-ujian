import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/api/v1/raja_ujian",
  headers: {
    Authorization: "Basic c3VwZXJhZG1pbjIxOnN1cGVyYWRtaW4yMQ==",
  },
});

export class QuizService {
  static ApiEndpoint = {
    quiz: "/quiz",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.quiz);
  }

  static getOne(quiz_id: string) {
    if (quiz_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.quiz + `/${quiz_id}`);
  }
}

export const useGetAllQuiz = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllQuiz"],
    fetchAction: async () => await QuizService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOneQuiz = (quiz_id: string) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOneQuiz", quiz_id],
    fetchAction: async () => await QuizService.getOne(quiz_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
