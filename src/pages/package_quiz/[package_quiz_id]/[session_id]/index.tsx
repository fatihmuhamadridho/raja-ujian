import Default from "@/components/templates/Default/Default";
import { useAuth } from "@/contexts/Auth/auth.context";
import {
  TryoutSessionService,
  useGetOneTryoutSession,
} from "@/services/tryoutSessionService";
import { Button, Group, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const PackageQuizReviewPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { package_quiz_id, session_id }: { [key: string]: any } = router.query;
  const { data: detailTryoutSession } = useGetOneTryoutSession(session_id);

  const handleUbahJawaban = async (quiz_id: number) => {
    try {
      const response = await TryoutSessionService.putTryout(session_id, {
        quiz_active: quiz_id,
      });
      if (response.status === 200)
        router.push(
          `/package_quiz/${package_quiz_id}/${session_id}/${quiz_id}`
        );
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const handleSubmitJawaban = async () => {
    try {
      const response = await TryoutSessionService.finishTryout(
        session_id,
        package_quiz_id
      );
      if (response.status === 200) {
        await queryClient.invalidateQueries("useGetAllTryoutSessionByUser");
        alert("Berhasil submit jawaban!");
        router.push(`/package_quiz/${package_quiz_id}`);
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  console.log({ detailTryoutSession });

  return (
    <Default title="Soal Try Out - CPNS">
      <Stack>
        <Paper p={16} withBorder>
          <Stack gap={12}>
            <Text fz={22} fw={500}>
              CPNS 2023
            </Text>
            <Stack gap={0}>
              <Text>Waktu Pengerjaan : 120 menit</Text>
              <Text>Jumlah Soal : 50 soal</Text>
            </Stack>
            <Stack>
              {detailTryoutSession?.RajaUjian2_UserAnswers?.map(
                (user_answer: any, index: number) => (
                  <Paper
                    key={index}
                    className="cursor-pointer"
                    p={8}
                    withBorder
                    bg={user_answer?.user_answer ? "white" : "red"}
                  >
                    <Group justify="space-between">
                      <Group>
                        <Text>
                          {index + 1}
                          {")"}
                        </Text>
                        <Text>
                          {user_answer?.user_answer || "Belum dijawab"}
                        </Text>
                      </Group>
                      <Button
                        variant="default"
                        onClick={() =>
                          handleUbahJawaban(user_answer?.RajaUjian2QuizQuizId)
                        }
                      >
                        Ubah Jawaban
                      </Button>
                    </Group>
                  </Paper>
                )
              )}
            </Stack>
            <Button mt={48} onClick={handleSubmitJawaban}>
              Submit Jawaban
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Default>
  );
};

export default PackageQuizReviewPage;
