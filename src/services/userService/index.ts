import { paramsUserProps } from "./user";
import useQuery from "../../../toolkit/useQuery/useQuery";
import { UserService } from "./user";

export const useGetAllUser = () => {
  const { data, status, isFetching } = useQuery({
    key: ["getAllUser"],
    fetchAction: async () => {
      const response = await UserService.getAllUser();
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    },
  });

  return { data, status, isFetching };
};

export const useGetOneUser = (params: paramsUserProps) => {
  const { data, status, isFetching } = useQuery({
    key: ["getOneUser", params],
    fetchAction: async () => {
      const response = await UserService.getOneUser(params);
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    },
  });

  return { data, status, isFetching };
};
