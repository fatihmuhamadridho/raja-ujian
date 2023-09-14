export type soalModelProps = {
  soal_id: string;
  pertanyaan: string;
  pilihan_ganda: string[];
  jawaban: string;
  paket_soal: string;
  prev_soal?: string;
  next_soal?: string;
};
