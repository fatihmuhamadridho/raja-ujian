import { instance } from "../../../toolkit/instance";

const apiClient = instance({
  baseURL: "/api/v1",
});

export class PaketSoalService {
  static ApiEndpoint = {
    paket_soal: "/paket_soal",
  };

  static getAllPaketSoal() {
    return apiClient.get(this.ApiEndpoint.paket_soal);
  }

  static getOnePaketSoal(paket_soal_id: string) {
    if (paket_soal_id === "undefined") return undefined;
    return apiClient.get(this.ApiEndpoint.paket_soal + `/${paket_soal_id}`);
  }
}
