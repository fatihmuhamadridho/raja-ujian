import Default from "@/components/templates/Default/Default";
import { useAuth } from "@/contexts/Auth/auth.context";
import { useGetOneQuiz } from "@/services/quizService";
import {
  UserProgressService,
  useGetOneUserProgress,
} from "@/services/userProgressService";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

const QuizPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { package_quiz_id, quiz_id }: { [key: string]: any } = router.query;
  const { data: detailQuiz } = useGetOneQuiz(quiz_id);
  const { data: detailUserProgress } = useGetOneUserProgress(
    user?.user_id,
    package_quiz_id
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [quizIndex, setQuizIndex] = useState<any>({
    currentIndex: null,
    lastIndex: null,
  });

  useEffect(() => {
    if (detailUserProgress) {
      const currentIndex = detailUserProgress?.order?.findIndex(
        (order: any) => Number(order) === Number(quiz_id)
      );
      const lastIndex: any = Number(detailUserProgress?.order?.length - 1);
      const answerChoiced = detailUserProgress?.list_choice[currentIndex];
      setQuizIndex({
        currentIndex,
        lastIndex,
      });
      if (answerChoiced) {
        setSelectedAnswer(answerChoiced);
      }
    }
  }, [detailUserProgress, quiz_id]);

  const handlePrevQuiz = async () => {
    const list_choice = detailUserProgress?.list_choice;
    list_choice[quizIndex.currentIndex] = selectedAnswer;
    try {
      const response = await UserProgressService.putProgress(
        detailUserProgress?.user_progress_id,
        {
          list_choice,
          score: detailUserProgress?.score + detailQuiz?.score,
        }
      );
      if (response.status === 200) {
        await queryClient.invalidateQueries("useGetOneUserProgress");
        router.push({
          query: {
            package_quiz_id: detailQuiz?.RajaUjian_PackageQuiz?.package_quiz_id,
            quiz_id: detailUserProgress?.order[quizIndex?.currentIndex - 1],
          },
        });
        setSelectedAnswer("");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const handleNextQuiz = async () => {
    const list_choice = detailUserProgress?.list_choice;
    list_choice[quizIndex.currentIndex] = selectedAnswer;
    try {
      const response = await UserProgressService.putProgress(
        detailUserProgress?.user_progress_id,
        {
          list_choice,
          score: detailUserProgress?.score + detailQuiz?.score,
        }
      );
      if (response.status === 200) {
        await queryClient.invalidateQueries("useGetOneUserProgress");
        router.push({
          query: {
            package_quiz_id: detailQuiz?.RajaUjian_PackageQuiz?.package_quiz_id,
            quiz_id: detailUserProgress?.order[quizIndex?.currentIndex + 1],
          },
        });
        setSelectedAnswer("");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  console.log({
    detailQuiz,
    detailUserProgress,
    query: router.query,
    selectedAnswer,
    quizIndex,
  });

  return (
    <Default title="Soal Try Out - CPNS">
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
              Soal Nomor {quizIndex?.currentIndex + 1}/
              {detailUserProgress?.order?.length}
            </Text>
            <Divider />
            <Box mb={64}>
              <div dangerouslySetInnerHTML={{ __html: detailQuiz?.question }} />
            </Box>
            <Text fs={"italic"}>Pilih jawaban berikut :</Text>
            <Stack spacing={8}>
              {detailQuiz?.multiple_choice?.map(
                (choice: any, index: number) => (
                  <Paper
                    key={index}
                    className="cursor-pointer"
                    p={12}
                    bg={choice === selectedAnswer ? "#D6E6F2" : "white"}
                    radius={4}
                    withBorder
                    onClick={() => setSelectedAnswer(choice)}
                  >
                    <Flex gap={4} align={"center"}>
                      <Text>{String.fromCharCode(65 + index)}.</Text>
                      <div dangerouslySetInnerHTML={{ __html: choice }} />
                    </Flex>
                  </Paper>
                )
              )}
            </Stack>
          </Stack>
        </Paper>
        <Paper p={16} withBorder>
          <Stack spacing={12}>
            <Group>
              <Text>
                Jawaban Anda adalah{" "}
                {selectedAnswer
                  ? String.fromCharCode(
                      65 +
                        detailQuiz?.multiple_choice?.findIndex(
                          (choice: string) => choice === selectedAnswer
                        )
                    )
                  : "?"}
              </Text>
            </Group>
            <Divider />
            <Flex justify={"space-between"}>
              <Group>
                {quizIndex?.currentIndex !== 0 && (
                  <Button variant="default" onClick={handlePrevQuiz}>
                    Soal Sebelumnya
                  </Button>
                )}
                {quizIndex?.currentIndex !== quizIndex?.lastIndex && (
                  <Button variant="default" onClick={handleNextQuiz}>
                    Soal Berikutnya
                  </Button>
                )}
              </Group>
              <Button
                variant="default"
                onClick={() =>
                  router.push(`/package_quiz/${package_quiz_id}/review`)
                }
              >
                Selesai
              </Button>
            </Flex>
          </Stack>
        </Paper>
      </Stack>
    </Default>
  );
};

export default QuizPage;
