import {
  Anchor,
  Avatar,
  Burger,
  Button,
  Center,
  Container,
  Divider,
  Drawer,
  Flex,
  Group,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import { IconLogout, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useAuth } from "@/contexts/Auth/auth.context";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const Navbar = () => {
  const { user, onLogout } = useAuth();
  const [opened, { toggle, open, close }] = useDisclosure();
  const mobileResponsive = useMediaQuery("(max-width: 425px)", true, {
    getInitialValueInEffect: false,
  });
  const dekstopResponsive = useMediaQuery("(min-width: 426px)", true, {
    getInitialValueInEffect: false,
  });

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
          {mobileResponsive && (
            <>
              <Burger
                opened={opened}
                onClick={toggle}
                aria-label="Toggle navigation"
                color="#fff"
              />
              <Drawer opened={opened} onClose={close} title="Raja Ujian">
                <Stack>
                  <Link href={"/"}>
                    <Text fz={14}>Beranda</Text>
                  </Link>
                  <Link href={"/"}>
                    <Text fz={14}>About</Text>
                  </Link>
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
                    <Stack>
                      <Flex className="cursor-pointer" align={"center"} gap={8}>
                        <Avatar size={28} radius={"100%"} />
                        <Text fz={16}>{user?.username}</Text>
                      </Flex>

                      <Group gap={8}>
                        <IconUser size={20} />
                        <Text>Profil</Text>
                      </Group>
                      <Group gap={8} onClick={() => onLogout("access_token")}>
                        <IconLogout size={20} />
                        <Text>Keluar</Text>
                      </Group>
                    </Stack>
                  )}
                </Stack>
              </Drawer>
            </>
          )}
          {dekstopResponsive && (
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
                      <Menu.Item
                        w={175}
                        onClick={() => onLogout("access_token")}
                      >
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
          )}
        </Flex>
      </Center>
    </Container>
  );
};

export default Navbar;
