import {
  Anchor,
  Avatar,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import React from "react";
import { IconLogout, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useAuth } from "@/contexts/Auth/auth.context";

const Navbar = () => {
  const { user, onLogout } = useAuth();

  return (
    <Container fluid py={8} h={60} bg={"#769FCD"}>
      <Center px={16} w={"100%"} h={"100%"}>
        <Flex
          w={"100%"}
          maw={1280}
          h={"100%"}
          align={"center"}
          justify={"space-between"}
        >
          <Link href={"/"}>
            <Text fz={22} c="#fff">
              Raja Ujian
            </Text>
          </Link>
          <Group>
            <Group>
              <Link href={"/"}>
                <Text fz={14} c="#fff">
                  Beranda
                </Text>
              </Link>
              <Link href={"/"}>
                <Text fz={14} c="#fff">
                  About
                </Text>
              </Link>
            </Group>
            <Divider orientation="vertical" />
            {!user && (
              <Group>
                <Link href={"/register"}>
                  <Button variant="default">
                    <Text c="black">Daftar</Text>
                  </Button>
                </Link>
                <Link href={"/login"}>
                  <Button variant="default">
                    <Text c="black">Masuk</Text>
                  </Button>
                </Link>
              </Group>
            )}
            {user && (
              <Group>
                <Menu>
                  <Menu.Target>
                    <Flex className="cursor-pointer" align={"center"} gap={8}>
                      <Avatar size={28} radius={"100%"} bg={"#fff"} />
                      <Text fz={16} c="#fff">
                        {user?.username}
                      </Text>
                    </Flex>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item w={175}>
                      <Group gap={8}>
                        <IconUser size={20} />
                        <Text>Profil</Text>
                      </Group>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item w={175} onClick={() => onLogout("access_token")}>
                      <Group gap={8}>
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
    </Container>
  );
};

export default Navbar;
