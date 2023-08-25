import { Anchor, Center, Divider, Navbar, Stack, Tooltip } from "@mantine/core";
import { IconArticle, IconHome, IconPackage, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/router";
import React from "react";

const SidebarAdmin = () => {
  const router = useRouter();

  return (
    <Navbar className="sticky" py={24} width={{ base: 64 }}>
      <Center>
        <Stack spacing={24}>
          <Tooltip
            className="cursor-pointer"
            label="Home"
            position="right"
            onClick={() => router.push("/admin")}
          >
            <IconHome />
          </Tooltip>
          <Divider />
          <Tooltip
            className="cursor-pointer"
            label="Paket Soal"
            position="right"
            onClick={() => router.push("/admin/paket")}
          >
            <IconPackage />
          </Tooltip>
          <Tooltip
            className="cursor-pointer"
            label="Soal"
            position="right"
            onClick={() => router.push("/admin/soal")}
          >
            <IconArticle />
          </Tooltip>
          <Divider />
          <Tooltip
            className="cursor-pointer"
            label="User"
            position="right"
            onClick={() => router.push("/admin/user")}
          >
            <IconUser />
          </Tooltip>
        </Stack>
      </Center>
    </Navbar>
  );
};

export default SidebarAdmin;
