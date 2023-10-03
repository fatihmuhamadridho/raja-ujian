import Default from "@/components/templates/Default/Default";
import { useAuth } from "@/contexts/Auth/auth.context";
import { useGetOneUserProgress } from "@/services/userProgressService";
import { Button, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const PackageQuizReviewPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { package_quiz_id }: { [key: string]: any } = router.query;
  const { data: detailUserProgress } = useGetOneUserProgress(
    user?.user_id,
    package_quiz_id
  );

  console.log({ detailUserProgress });

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
            <Stack>
              {detailUserProgress?.order?.map((quiz: any, index: number) => (
                <Paper
                  key={index}
                  className="cursor-pointer"
                  p={8}
                  withBorder
                  onClick={() =>
                    router.push(
                      `/package_quiz/${package_quiz_id}/quiz/${detailUserProgress?.order[index]}`
                    )
                  }
                >
                  Soal Nomor {index + 1}
                </Paper>
              ))}
            </Stack>
            <Button
              variant="default"
              // onClick={() => router.push("/package_quiz/123/quiz/123")}
            >
              Selesai
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Default>
  );
};

export default PackageQuizReviewPage;
