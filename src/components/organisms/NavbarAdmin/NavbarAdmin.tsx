import { Avatar, Center, Flex, Group, Header, Menu, Text } from "@mantine/core";
import React from "react";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/router";

const NavbarAdmin = () => {
  const router = useRouter();

  return (
    <Header className="sticky" py={8} height={60}>
      <Center px={16} w={"100%"} h={"100%"}>
        <Flex w={"100%"} h={"100%"} align={"center"} justify={"space-between"}>
          <Text className="cursor-pointer" fz={22} onClick={() => router.push("/admin")}>
            Raja Ujian Dashboard
          </Text>
          <Group>
            <Menu>
              <Menu.Target>
                <Flex className="cursor-pointer" align={"center"} gap={8}>
                  <Avatar size={28} radius={"100%"} />
                  <Text fz={16}>Tirta Puspitasari</Text>
                </Flex>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item w={160}>
                  <Group spacing={8}>
                    <IconUser size={20} />
                    <Text>Profil</Text>
                  </Group>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item w={160}>
                  <Group spacing={8} onClick={() => router.push("/")}>
                    <IconLogout size={20} />
                    <Text>Keluar</Text>
                  </Group>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>
      </Center>
    </Header>
  );
};

export default NavbarAdmin;
