import Default from "@/components/templates/Default/Default";
import { useAuth } from "@/contexts/Auth/auth.context";
import { useGetOnePackageQuiz } from "@/services/packageQuizService";
import {
  UserProgressService,
  useGetOneUserProgress,
} from "@/services/userProgressService";
import { Button, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const PackageQuizDetailPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { package_quiz_id }: { [key: string]: any } = router.query;
  const { data: detailPackageQuiz } = useGetOnePackageQuiz(package_quiz_id);
  const { data: detailUserProgress } = useGetOneUserProgress(
    user?.user_id,
    package_quiz_id
  );

  const handleStartPackageQuiz = async () => {
    try {
      const response = await UserProgressService.startProgress(
        user?.user_id,
        package_quiz_id
      );
      console.log({ response });
      if (response?.status === 200) {
        router.push(router.asPath + `/quiz/${response?.data?.data?.order[0]}`);
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const handleContinuePackageQuiz = async () => {
    const choice_index = detailUserProgress?.list_choice?.length;
    router.push(
      router.asPath + `/quiz/${detailUserProgress.order[choice_index]}`
    );
  };

  console.log({
    detailPackageQuiz,
    user,
    detailUserProgress,
    choice_index: detailUserProgress?.list_choice?.length,
  });

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
            {!detailUserProgress && (
              <Button variant="default" onClick={handleStartPackageQuiz}>
                Mulai
              </Button>
            )}
            {detailUserProgress && (
              <Button variant="default" onClick={handleContinuePackageQuiz}>
                Lanjutkan
              </Button>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Default>
  );
};

export default PackageQuizDetailPage;
