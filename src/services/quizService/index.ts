import useQuery from "../../../toolkit/useQuery";
import { QuizService } from "./quiz";

export const useGetAllQuiz = () => {
  const { data, status, isFetching } = useQuery({
    key: ["getAllQuiz"],
    fetchAction: async () => {
      const response = await QuizService.getAllQuiz();
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    },
  });

  return { data, status, isFetching };
};

export const useGetQuizListPackage = () => {
  const { data, status, isFetching } = useQuery({
    key: ["getQuizListPackage"],
    fetchAction: async () => {
      const response = await QuizService.getQuizListPackage();
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    },
  });

  return { data, status, isFetching };
};
