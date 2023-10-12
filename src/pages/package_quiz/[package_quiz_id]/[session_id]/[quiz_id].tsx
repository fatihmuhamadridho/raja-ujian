import Default from "@/components/templates/Default/Default";
import { useGetOneQuiz } from "@/services/quizService";
import {
  TryoutSessionService,
  useGetOneTryoutSession,
} from "@/services/tryoutSessionService";
import { UserAnswerService } from "@/services/userAnswerService";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

const QuizPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { package_quiz_id, session_id, quiz_id }: { [key: string]: any } =
    router.query;
  const { data: detailQuiz } = useGetOneQuiz(quiz_id);
  const { data: detailTryoutSession } = useGetOneTryoutSession(session_id);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizIndex, setQuizIndex] = useState(null);

  useEffect(() => {
    if (detailTryoutSession) {
      const findQuizProgress =
        detailTryoutSession?.RajaUjian2_UserAnswers?.find(
          (session: any) =>
            Number(session.RajaUjian2QuizQuizId) === Number(quiz_id)
        );
      const findIndexQuizProgress =
        detailTryoutSession?.RajaUjian2_UserAnswers?.findIndex(
          (session: any) =>
            Number(session.RajaUjian2QuizQuizId) === Number(quiz_id)
        );
      console.log({ findQuizProgress });
      setSelectedAnswer(findQuizProgress.user_answer);
      setQuizIndex(findIndexQuizProgress);
    }
  }, [detailTryoutSession, quiz_id]);

  const handleClearSelectedAnswer = async () => {
    setSelectedAnswer(null);
  };

  const handlePrevQuiz = async () => {
    const responsePutTryout = await TryoutSessionService.putTryout(session_id, {
      quiz_active:
        detailTryoutSession?.RajaUjian2_UserAnswers[quizIndex! - 1]
          ?.RajaUjian2QuizQuizId,
    });

    if (
      String(
        detailTryoutSession.RajaUjian2_UserAnswers[quizIndex!].user_answer
      ) === String(selectedAnswer)
    )
      return router.push({
        query: {
          package_quiz_id,
          session_id,
          quiz_id:
            detailTryoutSession?.RajaUjian2_UserAnswers[quizIndex! - 1]
              ?.RajaUjian2QuizQuizId,
        },
      });

    try {
      const responseUserAnswer = await UserAnswerService.putUserAnswer(
        detailTryoutSession.RajaUjian2_UserAnswers[quizIndex!].user_answer_id,
        String(selectedAnswer)
      );
      if (
        responseUserAnswer.status === 200 &&
        responsePutTryout.status === 200
      ) {
        await queryClient.invalidateQueries("useGetOneTryoutSession");
        router.push({
          query: {
            package_quiz_id,
            session_id,
            quiz_id:
              detailTryoutSession?.RajaUjian2_UserAnswers[quizIndex! - 1]
                ?.RajaUjian2QuizQuizId,
          },
        });
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const handleNextQuiz = async () => {
    const responsePutTryout = await TryoutSessionService.putTryout(session_id, {
      quiz_active:
        detailTryoutSession?.RajaUjian2_UserAnswers[quizIndex! + 1]
          ?.RajaUjian2QuizQuizId,
    });

    if (
      String(
        detailTryoutSession.RajaUjian2_UserAnswers[quizIndex!].user_answer
      ) === String(selectedAnswer)
    )
      return router.push({
        query: {
          package_quiz_id,
          session_id,
          quiz_id:
            detailTryoutSession?.RajaUjian2_UserAnswers[quizIndex! + 1]
              ?.RajaUjian2QuizQuizId,
        },
      });

    try {
      const responseUserAnswer = await UserAnswerService.putUserAnswer(
        detailTryoutSession.RajaUjian2_UserAnswers[quizIndex!].user_answer_id,
        String(selectedAnswer)
      );
      if (
        responseUserAnswer.status === 200 &&
        responsePutTryout.status === 200
      ) {
        await queryClient.invalidateQueries("useGetOneTryoutSession");
        router.push({
          query: {
            package_quiz_id,
            session_id,
            quiz_id:
              detailTryoutSession?.RajaUjian2_UserAnswers[quizIndex! + 1]
                ?.RajaUjian2QuizQuizId,
          },
        });
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const handleFinishQuiz = async () => {
    if (
      String(
        detailTryoutSession.RajaUjian2_UserAnswers[quizIndex!].user_answer
      ) === String(selectedAnswer)
    )
      return router.push(`/package_quiz/${package_quiz_id}/${session_id}`);

    try {
      const responseUserAnswer = await UserAnswerService.putUserAnswer(
        detailTryoutSession.RajaUjian2_UserAnswers[quizIndex!].user_answer_id,
        String(selectedAnswer)
      );
      if (responseUserAnswer.status === 200) {
        await queryClient.invalidateQueries("useGetOneTryoutSession");
        router.push(`/package_quiz/${package_quiz_id}/${session_id}`);
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  console.log({
    detailQuiz,
    detailTryoutSession,
    query: router.query,
    quizIndex,
    length: detailTryoutSession?.user_progress?.length,
  });

  return (
    <Default title="Soal Try Out - CPNS">
      <Stack>
        <Paper p={16} withBorder>
          <Stack gap={12}>
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
          <Stack gap={12}>
            <Text>
              Soal Nomor {quizIndex! + 1}/
              {detailTryoutSession?.RajaUjian2_UserAnswers?.length}
            </Text>
            <Divider />
            <Box mb={64}>
              <div dangerouslySetInnerHTML={{ __html: detailQuiz?.quiz }} />
            </Box>
            <Text fs={"italic"}>Pilih jawaban berikut :</Text>
            <Stack gap={8}>
              {detailQuiz?.options?.map((choice: any, index: number) => (
                <Paper
                  key={index}
                  className="cursor-pointer"
                  p={12}
                  bg={
                    String(selectedAnswer) === String(choice)
                      ? "#D6E6F2"
                      : "white"
                  }
                  radius={4}
                  withBorder
                  onClick={() => setSelectedAnswer(choice)}
                >
                  <Flex gap={4} align={"center"}>
                    <Text>{String.fromCharCode(65 + index)}.</Text>
                    <div dangerouslySetInnerHTML={{ __html: choice }} />
                  </Flex>
                </Paper>
              ))}
            </Stack>
          </Stack>
        </Paper>
        <Paper p={16} withBorder>
          <Stack gap={12}>
            <Group justify="space-between">
              <Text>
                Jawaban Anda adalah{" "}
                {selectedAnswer
                  ? String.fromCharCode(
                      65 +
                        detailQuiz?.options?.findIndex(
                          (choice: any) =>
                            String(choice) === String(selectedAnswer)
                        )
                    )
                  : "?"}
              </Text>
              <Text
                className="cursor-pointer"
                fz={12}
                c={"red"}
                onClick={handleClearSelectedAnswer}
              >
                Bersihkan jawaban
              </Text>
            </Group>
            <Divider />
            <Flex justify={"space-between"}>
              <Group>
                {quizIndex !== 0 && (
                  <Button variant="default" onClick={handlePrevQuiz}>
                    Soal Sebelumnya
                  </Button>
                )}
                {quizIndex! + 1 !==
                  detailTryoutSession?.RajaUjian2_UserAnswers?.length && (
                  <Button variant="default" onClick={handleNextQuiz}>
                    Soal Berikutnya
                  </Button>
                )}
              </Group>
              <Tooltip label="Anda akan diarahkan ke halaman review jawaban">
                <Button variant="default" onClick={handleFinishQuiz}>
                  Selesai
                </Button>
              </Tooltip>
            </Flex>
          </Stack>
        </Paper>
      </Stack>
    </Default>
  );
};

export default QuizPage;
