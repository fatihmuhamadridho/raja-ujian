import DataTable, { DataTableHeaderProps } from "@/components/atoms/DataTable";
import DefaultAdmin from "@/components/templates/DefaultAdmin/DefaultAdmin";
import { useGetAllPackage } from "@/services/packageService";
import { Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import { IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import React from "react";
import { useRouter } from "next/router";

const SoalAdminPage = () => {
  const router = useRouter();
  const { data: listPackage } = useGetAllPackage();

  const renderAction = (values: any) => {
    return (
      <Flex gap={4}>
        <IconPencil className="p-1 cursor-pointer" size={32} />
        <IconTrash className="p-1 cursor-pointer" size={32} />
      </Flex>
    );
  };

  const tableHeader: DataTableHeaderProps[] = [
    { label: "No", key: "index" },
    { label: "Nama Soal", key: "name" },
    { label: "Group", key: "group" },
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
        <DataTable header={tableHeader} data={listPackage} />
      </Stack>
    </DefaultAdmin>
  );
};

export default SoalAdminPage;
