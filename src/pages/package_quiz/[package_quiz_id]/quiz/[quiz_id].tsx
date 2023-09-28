import Default from "@/components/templates/Default/Default";
import { useGetOneQuiz } from "@/services/quizService";
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
import React, { useState } from "react";

const QuizPage = () => {
  const router = useRouter();
  const { quiz_id }: { [key: string]: any } = router.query;
  const { data: detailQuiz } = useGetOneQuiz(quiz_id);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  console.log({
    detailQuiz,
    query: router.query,
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
            <Text>Soal Nomor 1/100</Text>
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
            <Divider />
            <Flex justify={"space-between"}>
              <Group>
                <Button
                  variant="default"
                  onClick={() =>
                    router.push({
                      query: {
                        package_quiz_id:
                          detailQuiz?.RajaUjian_PackageQuiz?.package_quiz_id,
                        quiz_id: detailQuiz?.prev_quiz,
                      },
                    })
                  }
                >
                  Soal Sebelumnya
                </Button>
                <Button
                  variant="default"
                  onClick={() =>
                    router.push({
                      query: {
                        package_quiz_id:
                          detailQuiz?.RajaUjian_PackageQuiz?.package_quiz_id,
                        quiz_id: detailQuiz?.next_quiz,
                      },
                    })
                  }
                >
                  Soal Berikutnya
                </Button>
              </Group>
              <Button
                variant="default"
                onClick={() => router.push("/package_quiz/123/review")}
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
