import { Center, Divider, Navbar, Stack, Tooltip } from "@mantine/core";
import { IconArticle, IconHome, IconPackage, IconUser } from "@tabler/icons-react";
import React from "react";

const SidebarAdmin = () => {
  return (
    <Navbar className="sticky" py={24} width={{ base: 64 }}>
      <Center>
        <Stack spacing={24}>
          <Tooltip label="Home" position="right">
            <IconHome />
          </Tooltip>
          <Divider />
          <Tooltip label="Paket Soal" position="right">
            <IconPackage />
          </Tooltip>
          <Tooltip label="Soal" position="right">
            <IconArticle />
          </Tooltip>
          <Divider />
          <Tooltip label="User" position="right">
            <IconUser />
          </Tooltip>
        </Stack>
      </Center>
    </Navbar>
  );
};

export default SidebarAdmin;
