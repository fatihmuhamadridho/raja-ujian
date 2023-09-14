import Default from "@/components/templates/Default/Default";
import React from "react";
import { Paper, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { useGetAllPaketSoal } from "@/services/paketSoalService";

const HomePage = () => {
  const router = useRouter();
  const { data: listPaketSoal } = useGetAllPaketSoal();

  console.log({ listPaketSoal });

  return (
    <Default title="Raja Ujian">
      <Stack spacing={8}>
        {listPaketSoal?.map((item: any, index: number) => {
          return (
            <Paper
              className="cursor-pointer"
              p={12}
              key={index}
              withBorder
              onClick={() => router.push("/paket_soal/" + item?.paket_soal_id)}
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
