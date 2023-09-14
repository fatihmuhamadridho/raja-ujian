import soalData from "../../__test__/data/soal.data.json";

export interface soalModelQuery {
  soal_id: string;
}

export class SoalController {
  static async getOne({ soal_id }: soalModelQuery) {
    const response = soalData.find(soal => soal.soal_id === soal_id);
    return response;
  }
}
