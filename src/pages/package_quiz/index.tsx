import Default from "@/components/templates/Default/Default";
import { Button, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const PackageQuizPage = () => {
  const router = useRouter();

  return (
    <Default title="Soal Try Out - CPNS">
      <Stack>
        <Paper p={16} withBorder>
          <Stack spacing={12}>
            <Text fz={22} fw={500}>
              CPNS 2023
            </Text>
            <Stack spacing={0}>
              <Text>Waktu Pengerjaan : 120 menit</Text>
              <Text>Jumlah Soal : 50 soal</Text>
            </Stack>
            <Button
              variant="default"
              onClick={() => router.push("/package_quiz/123/quiz/123")}
            >
              Mulai
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Default>
  );
};

export default PackageQuizPage;
