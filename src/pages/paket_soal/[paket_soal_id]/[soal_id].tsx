import Default from "@/components/templates/Default/Default";
import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useGetOneSoal } from "@/services/soalService";
import { useGetOnePaketSoal } from "@/services/paketSoalService";
import { soalModelProps } from "../../../../server/models/soal.model";

export interface paketSoalProgressProps {
  isFinished: boolean;
  selectedAnswer: Array<{ soal_id: string; answer: string }>;
}

const DetailSoalPage = () => {
  const router = useRouter();
  const { paket_soal_id, soal_id } = router.query;
  const { data: detailPaketSoal } = useGetOnePaketSoal(String(paket_soal_id));
  const { data: detailSoal }: { data: soalModelProps } = useGetOneSoal(String(soal_id));

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [paketSoalProgress, setPaketSoalProgress] = useState<paketSoalProgressProps>({
    isFinished: true,
    selectedAnswer: [],
  });

  console.log({ paketSoalProgress, detailPaketSoal, selectedAnswer });

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

  const handlePrevSoal = async () => {
    console.log({ selectedAnswer });
    detailSoal.prev_soal &&
      router.push({ query: { paket_soal_id, soal_id: detailSoal?.prev_soal } });

    setSelectedAnswer(null);
  };

  const handleNextSoal = async () => {
    console.log({ selectedAnswer });
    detailSoal.next_soal &&
      router.push({ query: { paket_soal_id, soal_id: detailSoal?.next_soal } });

    setSelectedAnswer(null);
  };

  const handleSelesai = async () => {
    router.push(`/paket_soal/${paket_soal_id}`);
    setSelectedAnswer(null);
  };

  return (
    <Default title="Raja Ujian">
      <Stack>
        <Paper p={16} withBorder>
          <Stack spacing={12}>
            <Flex justify={"space-between"}>
              <Group>
                <Text>Kelompok Soal</Text>
                <Text>CPNS</Text>
              </Group>
              <Group>
                <Text>Mata Pelajaran</Text>
                <Text>CPNS 2021 TRY OUT</Text>
              </Group>
            </Flex>
            <Divider />
            <Group>
              <Text>Paket Soal</Text>
              <Text>CPNS 2021 TRY OUT</Text>
            </Group>
          </Stack>
        </Paper>
        <Paper p={16} withBorder>
          <Stack spacing={12}>
            <Text>Soal Nomor 1/50</Text>
            <Divider />
            <Box mb={64}>
              <div dangerouslySetInnerHTML={{ __html: detailSoal?.pertanyaan }} />
            </Box>
            <Text fs={"italic"}>Pilih jawaban berikut :</Text>
            <Stack spacing={8}>
              {detailSoal?.pilihan_ganda?.map((pilihan: any, index: number) => (
                <Paper
                  key={index}
                  className="cursor-pointer"
                  p={12}
                  bg={selectedAnswer === pilihan ? "#D6E6F2" : "white"}
                  radius={4}
                  withBorder
                  onClick={() => setSelectedAnswer(pilihan)}
                >
                  <Flex gap={4}>
                    <Text>{String.fromCharCode(65 + index)}.</Text>
                    <div dangerouslySetInnerHTML={{ __html: pilihan }} />
                  </Flex>
                </Paper>
              ))}
            </Stack>
          </Stack>
        </Paper>
        <Paper p={16} withBorder>
          <Stack spacing={12}>
            <Text>Jawaban Anda adalah {String.fromCharCode(63)}</Text>
            <Divider />
            <Flex justify={"space-between"}>
              <Group>
                {detailSoal?.prev_soal && (
                  <Button variant="default" onClick={handlePrevSoal}>
                    Soal Sebelumnya
                  </Button>
                )}
                {detailSoal?.next_soal && (
                  <Button variant="default" onClick={handleNextSoal}>
                    Soal Berikutnya
                  </Button>
                )}
              </Group>
              <Button variant="default" onClick={handleSelesai}>
                Selesai
              </Button>
            </Flex>
          </Stack>
        </Paper>
      </Stack>
    </Default>
  );
};

export default DetailSoalPage;
