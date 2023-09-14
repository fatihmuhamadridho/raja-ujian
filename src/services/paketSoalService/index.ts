import useQuery from "../../../toolkit/useQuery";
import { PaketSoalService } from "./paketSoal";

export const useGetAllPaketSoal = () => {
  const { data, status, isFetching } = useQuery({
    key: ["getAllPaketSoal"],
    fetchAction: async () => {
      const response = await PaketSoalService.getAllPaketSoal();
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    },
  });

  return { data, status, isFetching };
};

export const useGetOnePaketSoal = (paket_soal_id: string) => {
  const { data, status, isFetching } = useQuery({
    key: ["getOnePaketSoal", paket_soal_id],
    fetchAction: async () => {
      const response = await PaketSoalService.getOnePaketSoal(paket_soal_id);
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    },
  });

  return { data, status, isFetching };
};
