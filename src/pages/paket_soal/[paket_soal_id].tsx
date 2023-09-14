import Default from "@/components/templates/Default/Default";
import React, { useEffect, useState } from "react";
import { Button, Divider, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useGetOnePaketSoal } from "@/services/paketSoalService";
import { paketSoalProgressProps } from "./[paket_soal_id]/[soal_id]";

const DetailPaketSoalPage = () => {
  const router = useRouter();
  const { paket_soal_id } = router.query;
  const { data: detailPaketSoal } = useGetOnePaketSoal(String(paket_soal_id));

  const [paketSoalProgress, setPaketSoalProgress] = useState<paketSoalProgressProps>({
    isFinished: false,
    selectedAnswer: [],
  });

  useEffect(() => {
    function loadPaketSoalProgress() {
      if (paket_soal_id) {
        const progress = localStorage.getItem(String(paket_soal_id));
        if (progress) {
          setPaketSoalProgress(JSON.parse(progress));
        }
      }
    }

    loadPaketSoalProgress();
  }, [paket_soal_id]);

  return (
    <Default title="Raja Ujian">
      <Stack>
        <Paper p={16} withBorder>
          <Stack spacing={12}>
            <Text fz={22} fw={500}>
              CPNS 2023
            </Text>
            <Stack spacing={0}>
              <Text>Waktu Pengerjaan : {detailPaketSoal?.waktu_pengerjaan / 60 / 1000} menit</Text>
              <Text>Jumlah Soal : {detailPaketSoal?.soal?.length} soal</Text>
            </Stack>
            {paketSoalProgress.isFinished && (
              <Stack spacing={0}>
                <Text>Jumlah Benar : 10</Text>
                <Text>Jumlah Salah : 20</Text>
                <Text>Tidak Terjawab : 5</Text>
                <Divider />
                <Text>Nilai : 10</Text>
              </Stack>
            )}
            <Button
              variant="default"
              onClick={() =>
                router.push("/paket_soal" + `/${paket_soal_id}` + `/${detailPaketSoal.soal[0]}`)
              }
            >
              Mulai
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Default>
  );
};

export default DetailPaketSoalPage;
