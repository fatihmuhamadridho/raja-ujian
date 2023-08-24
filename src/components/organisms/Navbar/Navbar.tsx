import { Avatar, Center, Flex, Group, Header, Menu, Text } from "@mantine/core";
import React from "react";

const Navbar = () => {
  return (
    <Header py={8} height={"100%"} bg={"#769FCD"}>
      <Center w={"100%"} h={"100%"}>
        <Flex px={16} w={"100%"} maw={1280} h={"100%"} align={"center"} justify={"space-between"}>
          <Text fz={22} color="white">
            Raja Ujian
          </Text>
          <Group>
            <Text fz={14} color="white">
              Beranda
            </Text>
            <Text fz={14} color="white">
              About
            </Text>
          </Group>
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
                <Menu.Item w={150}>Profile</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>
      </Center>
    </Header>
  );
};

export default Navbar;
