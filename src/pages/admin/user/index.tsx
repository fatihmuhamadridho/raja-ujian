import DataTable, {
  DataTableHeaderProps,
} from "@/components/atoms/DataTable/DataTable";
import DefaultAdmin from "@/components/templates/DefaultAdmin/DefaultAdmin";
import { Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import { IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import React from "react";
import { useRouter } from "next/router";
import { useGetAllUser } from "@/services/userService";
import { userModelProps } from "@/services/userService/user";
import { dayjs } from "../../../libs/dayjs";

const UserAdminPage = () => {
  const router = useRouter();
  const { data: listUser } = useGetAllUser();

  const renderAction = (values: any) => {
    return (
      <Flex gap={4}>
        <IconPencil className="p-1 cursor-pointer" size={32} />
        <IconTrash className="p-1 cursor-pointer" size={32} />
      </Flex>
    );
  };

  const renderCreatedDate = (values: userModelProps) => {
    return <Text>{dayjs(values?.createdAt).format("DD-MMM-YYYY")}</Text>;
  };
  const renderUpdatedDate = (values: userModelProps) => {
    return <Text>{dayjs(values?.updatedAt).format("DD-MMM-YYYY")}</Text>;
  };

  const tableHeader: DataTableHeaderProps[] = [
    { label: "No", key: "index" },
    { label: "Username", key: "username" },
    { label: "Role", key: "index" },
    { label: "Tanggal Dibuat", key: renderCreatedDate },
    { label: "Tanggal Diupdate", key: renderUpdatedDate },
    { label: "Aksi", key: renderAction },
  ];

  return (
    <DefaultAdmin title="User">
      <Stack>
        <Text fz={24} fw={500}>
          User Data
        </Text>
        <Flex>
          <Button
            variant="default"
            onClick={() => router.push("/admin/user/tambah-user")}
          >
            Tambah User
          </Button>
        </Flex>
        <TextInput
          icon={<IconSearch size={18} />}
          placeholder="Cari berdasarkan username"
        />
        <DataTable header={tableHeader} data={listUser} />
      </Stack>
    </DefaultAdmin>
  );
};

export default UserAdminPage;
