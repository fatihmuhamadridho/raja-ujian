import Default from "@/components/templates/Default/Default";
import { useAuth } from "@/contexts/Auth/auth.context";
import { useGetOnePackageQuiz } from "@/services/packageQuizService";
import {
  TryoutSessionService,
  useGetAllTryoutSessionByUser,
} from "@/services/tryoutSessionService";
import { Button, Group, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const PackageQuizDetailPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { package_quiz_id }: { [key: string]: any } = router.query;
  const { data: detailPackageQuiz } = useGetOnePackageQuiz(package_quiz_id);
  const { data: listTryoutSessionByUser } = useGetAllTryoutSessionByUser(
    user?.user_id
  );

  const handleStartTryout = async () => {
    try {
      const response = await TryoutSessionService.startTryout({
        UserUserId: Number(user.user_id),
        RajaUjian2PackageQuizPackageQuizId: Number(package_quiz_id),
      });
      if (response.status === 200) {
        await queryClient.invalidateQueries("useGetAllTryoutSessionByUser");
        alert(response?.data?.message);
        router.push(
          `/package_quiz/${package_quiz_id}/${response.data.data.tryout_session_id}/${response.data.data.quiz_active}`
        );
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const handleContinueTryout = async (
    tryout_session_id: number,
    quiz_active: number
  ) => {
    router.push(
      `/package_quiz/${package_quiz_id}/${tryout_session_id}/${quiz_active}`
    );
  };

  const handleDeleteTryout = async (tryout_session_id: number) => {
    try {
      const response = await TryoutSessionService.deleteTryout(
        tryout_session_id
      );
      if (response.status === 200) {
        await queryClient.invalidateQueries("useGetAllTryoutSessionByUser");
        alert(response?.data?.message);
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  console.log({
    user,
    detailPackageQuiz,
    listTryoutSessionByUser,
  });

  return (
    <Default title="Soal Try Out - CPNS">
      <Stack>
        <Paper p={16} withBorder>
          <Stack gap={12}>
            <Text fz={22} fw={500}>
              {detailPackageQuiz?.name}
            </Text>
            <Stack gap={0}>
              <Text>Waktu Pengerjaan : 120 menit</Text>
              <Text>Jumlah Soal : 50 soal</Text>
            </Stack>
            {listTryoutSessionByUser?.map((session: any, index: number) => (
              <Paper key={index} p={12} withBorder>
                <Group justify="space-between" align="center">
                  <Stack>
                    <Text>{session.createdAt}</Text>
                    {session?.score > 0 && (
                      <Group>
                        <Text>
                          {session?.score} /{" "}
                          {session?.RajaUjian2_UserAnswers.length}
                        </Text>
                      </Group>
                    )}
                  </Stack>
                  <Group>
                    {session?.score < 1 && (
                      <Button
                        onClick={() =>
                          handleContinueTryout(
                            session?.tryout_session_id,
                            session.quiz_active
                          )
                        }
                      >
                        Lanjutkan
                      </Button>
                    )}
                    <Button
                      bg={"red"}
                      onClick={() =>
                        handleDeleteTryout(session?.tryout_session_id)
                      }
                    >
                      Delete
                    </Button>
                  </Group>
                </Group>
              </Paper>
            ))}
            <Button variant="default" onClick={handleStartTryout}>
              Mulai Baru
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Default>
  );
};

export default PackageQuizDetailPage;
