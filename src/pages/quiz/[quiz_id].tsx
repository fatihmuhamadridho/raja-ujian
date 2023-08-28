import Default from "@/components/templates/Default/Default";
import { useAuth } from "@/contexts/AuthContext/auth.context";
import { useGetOneQuiz } from "@/services/quizService";
import { useGetOneUserProgress } from "@/services/userProgressService";
import { Box, Button, Divider, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { quizModelProps } from "../../../server/models/quiz.model";
import { userProgressModelProps } from "../../../server/models/userProgress.model";

interface userProgressData extends Omit<userProgressModelProps, "package"> {
  package: {
    quizs: any[];
  };
}

const QuizIdPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { quiz_id } = router.query;
  const { data: detailUserProgress, status }: { data: userProgressData; [key: string]: any } =
    useGetOneUserProgress({
      userId: user?.user_id,
      packageId: String(quiz_id),
    });
  const { data: detailQuiz }: { data: quizModelProps } = useGetOneQuiz(
    String(detailUserProgress?.quiz_order[detailUserProgress?.last_quiz_index])
  );

  console.log({
    detailUserProgress,
    detailQuiz,
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Default title="Soal Try Out - CPNS">
      {!detailUserProgress && (
        <Stack>
          <Paper p={16} withBorder>
            <Stack spacing={12}>
              <Text fz={22} fw={500}>
                CPNS 2023
              </Text>
              <Stack spacing={0}>
                <Text>Waktu Pengerjaan : 110 menit</Text>
                <Text>Jumlah Soal : 100 soal</Text>
              </Stack>
              <Button variant="default">Mulai</Button>
            </Stack>
          </Paper>
        </Stack>
      )}

      {detailUserProgress && (
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
              <Text>
                Soal Nomor {detailQuiz?.number}/{detailUserProgress?.package?.quizs?.length}
              </Text>
              <Divider />
              <Box mb={64}>
                <div dangerouslySetInnerHTML={{ __html: detailQuiz?.question }} />
              </Box>
              <Text fs={"italic"}>Pilih jawaban berikut :</Text>
              <Stack spacing={8}>
                {detailQuiz?.multiple_choice?.map((choice, index) => (
                  <Paper
                    key={index}
                    className="cursor-pointer"
                    p={12}
                    bg={
                      detailUserProgress?.selected_answer[detailQuiz?.number - 1] === index
                        ? "#D6E6F2"
                        : "white"
                    }
                    radius={4}
                    withBorder
                  >
                    <Flex gap={4}>
                      <Text>{String.fromCharCode(65 + index)}.</Text>
                      <div dangerouslySetInnerHTML={{ __html: choice }} />
                    </Flex>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </Paper>
          <Paper p={16} withBorder>
            <Stack spacing={12}>
              <Text>
                Jawaban Anda adalah{" "}
                {String.fromCharCode(
                  65 + detailUserProgress?.selected_answer[detailQuiz?.number - 1]
                )}
              </Text>
              <Divider />
              <Flex justify={"space-between"}>
                <Group>
                  <Button variant="default">Soal Sebelumnya</Button>
                  <Button variant="default">Soal Berikutnya</Button>
                </Group>
                <Button variant="default">Selesai</Button>
              </Flex>
            </Stack>
          </Paper>
        </Stack>
      )}
    </Default>
  );
};

export default QuizIdPage;
