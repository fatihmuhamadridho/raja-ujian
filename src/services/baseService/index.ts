import useQuery from "../../../toolkit/useQuery";
import { BaseService } from "./base";

export const useGetAllBase = () => {
  const { data, status, isFetching } = useQuery({
    key: ["getAllBase"],
    fetchAction: async () => {
      const response = await BaseService.getAlllBase();
      return response;
    },
    select: (data: any) => {
      return data.data;
    },
  });

  return { data, status, isFetching };
};
