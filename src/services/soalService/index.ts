import useQuery from "../../../toolkit/useQuery";
import { SoalService } from "./soal";

export const useGetOneSoal = (soal_id: string) => {
  const { data, status, isFetching } = useQuery({
    key: ["getOneSoal", soal_id],
    fetchAction: async () => {
      const response = await SoalService.getOneSoal(soal_id);
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    },
  });

  return { data, status, isFetching };
};
