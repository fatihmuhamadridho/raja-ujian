import Default from "@/components/templates/Default/Default";
import { useGetAllPackage } from "@/services/packageService";
import React from "react";
import { packageModelProps } from "../../server/models/package.model";
import { Paper, Stack } from "@mantine/core";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  const { data: listPaket } = useGetAllPackage();

  return (
    <Default title="Raja Ujian">
      <Stack spacing={8}>
        {listPaket?.map((item: packageModelProps, index: number) => {
          return (
            <Paper
              className="cursor-pointer"
              p={12}
              key={index}
              withBorder
              onClick={() => router.push("/quiz/" + item.package_id)}
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
