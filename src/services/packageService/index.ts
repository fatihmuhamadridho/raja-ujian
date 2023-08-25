import useQuery from "../../../toolkit/useQuery";
import { PackageService } from "./package";

export const useGetAllPackage = () => {
  const { data, status, isFetching } = useQuery({
    key: ["getAllPackage"],
    fetchAction: async () => {
      const response = await PackageService.getAllPackage();
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    },
  });

  return { data, status, isFetching };
};
