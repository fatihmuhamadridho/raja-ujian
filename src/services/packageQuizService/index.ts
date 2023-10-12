import useQuery from "@/libs/useQuery";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + "/api/v2/raja_ujian",
});

export class PackageQuizService {
  static ApiEndpoint = {
    package_quiz: "/package_quiz",
  };

  static getAll() {
    return apiClient.get(this.ApiEndpoint.package_quiz);
  }

  static getOne(package_quiz_id: string) {
    if (package_quiz_id === undefined) return undefined;
    return apiClient.get(this.ApiEndpoint.package_quiz + `/${package_quiz_id}`);
  }
}

export const useGetAllPackageQuiz = () => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetAllPackageQuiz"],
    fetchAction: async () => await PackageQuizService.getAll(),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};

export const useGetOnePackageQuiz = (package_quiz_id: string) => {
  const { data, status, isFetching } = useQuery({
    key: ["useGetOnePackageQuiz", package_quiz_id],
    fetchAction: async () => await PackageQuizService.getOne(package_quiz_id),
    select: (data: any) => data.data.data,
  });

  return { data, status, isFetching };
};
