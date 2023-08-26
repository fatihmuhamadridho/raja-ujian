import DataTable, { DataTableHeaderProps } from "@/components/atoms/DataTable";
import DefaultAdmin from "@/components/templates/DefaultAdmin/DefaultAdmin";
import { Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import { IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import React from "react";
import { useRouter } from "next/router";
import { useGetAllQuiz } from "@/services/quizService";
import { quizModelProps } from "../../../../server/models/quiz.model";
import { packageModelProps } from "../../../../server/models/package.model";

interface quizDataProps extends Omit<quizModelProps, "package"> {
  package: packageModelProps;
}

const SoalAdminPage = () => {
  const router = useRouter();
  const { data: listQuiz } = useGetAllQuiz();
  console.log({ listQuiz });

  const renderPertanyaan = (values: quizDataProps) => (
    <div dangerouslySetInnerHTML={{ __html: values.question }} />
  );
  const renderPaketSoal = (values: quizDataProps) => (
    <Text>{String(values?.package?.package_id)}</Text>
  );
  const renderJawaban = (values: quizDataProps) => (
    <div dangerouslySetInnerHTML={{ __html: values.correct_answer }} />
  );
  const renderAction = (values: any) => (
    <Flex gap={4}>
      <IconPencil className="p-1 cursor-pointer" size={32} />
      <IconTrash className="p-1 cursor-pointer" size={32} />
    </Flex>
  );

  const tableHeader: DataTableHeaderProps[] = [
    { label: "No", key: "index" },
    { label: "Pertanyaan", key: renderPertanyaan },
    { label: "Paket Soal", key: renderPaketSoal },
    { label: "Jawaban", key: renderJawaban },
    { label: "Aksi", key: renderAction },
  ];

  return (
    <DefaultAdmin title="Soal">
      <Stack>
        <Text fz={24} fw={500}>
          Soal Data
        </Text>
        <Flex>
          <Button variant="default" onClick={() => router.push("/admin/soal/tambah-soal")}>
            Tambah Soal
          </Button>
        </Flex>
        <TextInput icon={<IconSearch size={18} />} placeholder="Cari berdasarkan username" />
        <DataTable header={tableHeader} data={listQuiz} />
      </Stack>
    </DefaultAdmin>
  );
};

export default SoalAdminPage;
