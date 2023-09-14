import paketSoalData from "../../__test__/data/paket_soal.data.json";

export class PaketSoalController {
  static async getAll() {
    const response = paketSoalData;
    return response;
  }

  static async getOne() {
    const response = paketSoalData[0];
    return response;
  }
}
