import Default from "@/components/templates/Default/Default";
import React from "react";
import { Paper, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { useGetAllPackageQuiz } from "@/services/packageQuizService";

const HomePage = () => {
  const router = useRouter();
  const { data: listPackageQuiz } = useGetAllPackageQuiz();

  console.log({ listPackageQuiz });

  return (
    <Default title="Raja Ujian">
      <Stack gap={8}>
        {listPackageQuiz?.map((item: any, index: number) => {
          return (
            <Paper
              className="cursor-pointer"
              p={12}
              key={index}
              withBorder
              onClick={() =>
                router.push("/package_quiz" + `/${item.package_quiz_id}`)
              }
            >
              {item.name}
            </Paper>
          );
        })}
      </Stack>
    </Default>
  );
};

export default HomePage;
