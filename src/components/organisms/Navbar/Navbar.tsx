import { Anchor, Avatar, Center, Divider, Flex, Group, Header, Menu, Text } from "@mantine/core";
import React from "react";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  return (
    <Header py={8} height={60} bg={"#769FCD"}>
      <Center px={16} w={"100%"} h={"100%"}>
        <Flex w={"100%"} maw={1280} h={"100%"} align={"center"} justify={"space-between"}>
          <Link href={"/"}>
            <Text fz={22} color="white">
              Raja Ujian
            </Text>
          </Link>
          <Group>
            <Group>
              <Text className="cursor-pointer" fz={14} color="white">
                Beranda
              </Text>
              <Text className="cursor-pointer" fz={14} color="white">
                About
              </Text>
            </Group>
            <Divider orientation="vertical" />
            <Group>
              <Menu>
                <Menu.Target>
                  <Flex className="cursor-pointer" align={"center"} gap={8}>
                    <Avatar size={28} radius={"100%"} />
                    <Text fz={16} color="white">
                      Tirta Puspitasari
                    </Text>
                  </Flex>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item w={175}>
                    <Group spacing={8}>
                      <IconUser size={20} />
                      <Text>Profil</Text>
                    </Group>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item w={175}>
                    <Group spacing={8}>
                      <IconLogout size={20} />
                      <Text>Keluar</Text>
                    </Group>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Flex>
      </Center>
    </Header>
  );
};

export default Navbar;
