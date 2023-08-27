import { AuthService } from "./auth";
import useQuery from "../../../toolkit/useQuery/useQuery";

export const useGetPrivileges = () => {
  const { data, status, isFetching } = useQuery({
    key: ["getPrivileges"],
    fetchAction: async () => {
      const response = await AuthService.getPrivileges();
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    },
  });

  return { data, status, isFetching };
};
