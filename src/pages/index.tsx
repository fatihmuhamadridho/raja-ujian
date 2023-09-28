import Default from "@/components/templates/Default/Default";
import React from "react";
import { Paper, Stack } from "@mantine/core";
import { useRouter } from "next/router";
<<<<<<< HEAD
import { useGetAllPaketSoal } from "@/services/paketSoalService";

const HomePage = () => {
  const router = useRouter();
  const { data: listPaketSoal } = useGetAllPaketSoal();

  console.log({ listPaketSoal });
=======
import { useGetAllPackageQuiz } from "@/services/packageQuizService";

const HomePage = () => {
  const router = useRouter();
  const { data: listPackageQuiz } = useGetAllPackageQuiz();

  console.log({ listPackageQuiz });
>>>>>>> 3f82a7b (feat: 🎸 revamp again)

  return (
    <Default title="Raja Ujian">
      <Stack spacing={8}>
<<<<<<< HEAD
        {listPaketSoal?.map((item: any, index: number) => {
=======
        {listPackageQuiz?.map((item: any, index: number) => {
>>>>>>> 3f82a7b (feat: 🎸 revamp again)
          return (
            <Paper
              className="cursor-pointer"
              p={12}
              key={index}
              withBorder
<<<<<<< HEAD
              onClick={() => router.push("/paket_soal/" + item?.paket_soal_id)}
=======
              onClick={() =>
                router.push("/package_quiz" + `/${item.package_quiz_id}`)
              }
>>>>>>> 3f82a7b (feat: 🎸 revamp again)
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
