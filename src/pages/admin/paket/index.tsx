import DataTable, {
  DataTableHeaderProps,
} from "@/components/atoms/DataTable/DataTable";
import DefaultAdmin from "@/components/templates/DefaultAdmin/DefaultAdmin";
import { useGetAllPackage } from "@/services/packageService";
import { Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import { IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import React from "react";
import { packageModelProps } from "../../../../server/models/package.model";
import { quizModelProps } from "../../../../server/models/quiz.model";
import { useRouter } from "next/router";

interface packageDataProps extends Omit<packageModelProps, "quizs"> {
  quizs: Array<quizModelProps>;
}

const PaketAdminPage = () => {
  const router = useRouter();
  const { data: listPackage } = useGetAllPackage();

  const renderJumlahQuiz = (values: packageDataProps) => (
    <Text>{values.quizs.length}</Text>
  );
  const renderAction = (values: packageDataProps) => {
    return (
      <Flex gap={4}>
        <IconPencil className="p-1 cursor-pointer" size={32} />
        <IconTrash className="p-1 cursor-pointer" size={32} />
      </Flex>
    );
  };

  const tableHeader: DataTableHeaderProps[] = [
    { label: "No", key: "index" },
    { label: "Nama Paket", key: "name" },
    { label: "Group", key: "group" },
    { label: "Jumlah Quiz", key: renderJumlahQuiz },
    { label: "Aksi", key: renderAction },
  ];

  return (
    <DefaultAdmin title="Paket Soal">
      <Stack>
        <Text fz={24} fw={500}>
          Paket Data
        </Text>
        <Flex>
          <Button
            variant="default"
            onClick={() => router.push("/admin/paket/tambah-paket")}
          >
            Tambah Paket
          </Button>
        </Flex>
        <TextInput
          icon={<IconSearch size={18} />}
          placeholder="Cari berdasarkan username"
        />
        <DataTable header={tableHeader} data={listPackage} />
      </Stack>
    </DefaultAdmin>
  );
};

export default PaketAdminPage;
