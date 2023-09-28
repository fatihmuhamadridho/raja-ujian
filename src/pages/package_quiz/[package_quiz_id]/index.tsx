import Default from "@/components/templates/Default/Default";
import { useGetOnePackageQuiz } from "@/services/packageQuizService";
import { Button, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const PackageQuizDetailPage = () => {
  const router = useRouter();
  const { package_quiz_id }: { [key: string]: any } = router.query;
  const { data: detailPackageQuiz } = useGetOnePackageQuiz(package_quiz_id);

  console.log({ detailPackageQuiz });

  return (
    <Default title="Soal Try Out - CPNS">
      <Stack>
        <Paper p={16} withBorder>
          <Stack spacing={12}>
            <Text fz={22} fw={500}>
              {detailPackageQuiz?.name}
            </Text>
            <Stack spacing={0}>
              <Text>Waktu Pengerjaan : 120 menit</Text>
              <Text>Jumlah Soal : 50 soal</Text>
            </Stack>
            <Button
              variant="default"
              onClick={() =>
                router.push(
                  router.asPath +
                    `/quiz/${detailPackageQuiz.RajaUjian_Quizzes[0].quiz_id}`
                )
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

export default PackageQuizDetailPage;
