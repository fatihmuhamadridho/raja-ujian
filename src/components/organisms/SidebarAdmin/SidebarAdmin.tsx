import { Center, Navbar, Stack, Tooltip } from "@mantine/core";
import { IconArticle, IconHome, IconUser } from "@tabler/icons-react";
import React from "react";

const SidebarAdmin = () => {
  return (
    <Navbar className="sticky" py={16} width={{ base: 64 }}>
      <Center>
        <Stack spacing={24}>
          <Tooltip label="Home" position="right">
            <IconHome />
          </Tooltip>
          <Tooltip label="Home" position="right">
            <IconArticle />
          </Tooltip>
          <Tooltip label="Home" position="right">
            <IconUser />
          </Tooltip>
        </Stack>
      </Center>
    </Navbar>
  );
};

export default SidebarAdmin;
