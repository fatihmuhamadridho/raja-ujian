import useQuery from "../../../toolkit/useQuery";
import { UserProgressService } from "./userProgress";

export const useGetAllUserProgress = () => {
  const { data, status, isFetching } = useQuery({
    key: ["getAllUserProgress"],
    fetchAction: async () => {
      const response = await UserProgressService.getAllUserProgress();
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    },
  });

  return { data, status, isFetching };
};

export const useGetOneUserProgress = (query: { userId: string; packageId: string }) => {
  const { data, status, isFetching } = useQuery({
    key: ["getOneUserProgress", query.userId, query.packageId],
    fetchAction: async () => {
      const response = await UserProgressService.getOneUserProgress(query);
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    },
  });

  return { data, status, isFetching };
};
