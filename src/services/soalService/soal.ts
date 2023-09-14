import { instance } from "../../../toolkit/instance";

const apiClient = instance({
  baseURL: "/api/v1",
});

export class SoalService {
  static ApiEndpoint = {
    soal: "/soal",
  };

  static getOneSoal(soal_id: string) {
    if (soal_id === "undefined") return undefined;
    return apiClient.get(this.ApiEndpoint.soal + `/${soal_id}`);
  }
}
