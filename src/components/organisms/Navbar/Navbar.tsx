import {
  Anchor,
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Header,
  Menu,
  Text,
} from "@mantine/core";
import React from "react";
import { IconLogout, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext/auth.context";

const Navbar = () => {
  const { user } = useAuth();

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
              <Link href={"/"}>
                <Text fz={14} color="white">
                  Beranda
                </Text>
              </Link>
              <Link href={"/"}>
                <Text fz={14} color="white">
                  About
                </Text>
              </Link>
            </Group>
            <Divider orientation="vertical" />
            {!user && (
              <Group>
                <Button className="border-white" variant="white">
                  <Text color="white">Daftar</Text>
                </Button>
                <Link href={"/login"}>
                  <Button className="border-white" variant="white">
                    <Text color="white">Masuk</Text>
                  </Button>
                </Link>
              </Group>
            )}
            {user && (
              <Group>
                <Menu>
                  <Menu.Target>
                    <Flex className="cursor-pointer" align={"center"} gap={8}>
                      <Avatar size={28} radius={"100%"} />
                      <Text fz={16} color="white">
                        {user?.username}
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
            )}
          </Group>
        </Flex>
      </Center>
    </Header>
  );
};

export default Navbar;
