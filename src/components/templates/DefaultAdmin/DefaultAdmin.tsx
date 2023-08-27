import NavbarAdmin from "@/components/organisms/NavbarAdmin/NavbarAdmin";
import SidebarAdmin from "@/components/organisms/SidebarAdmin/SidebarAdmin";
import { AuthProvider } from "@/contexts/AuthContext/AuthProvider";
import { Container, Flex } from "@mantine/core";
import Head from "next/head";
import React from "react";

interface DefaultProps {
  title: string;
  children?: React.ReactNode;
}

const DefaultAdmin = (props: DefaultProps) => {
  const { title, children } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container fluid p={0} mx={"0"}>
        <NavbarAdmin />
        <Flex>
          <SidebarAdmin />
          <Container p={24} w={"100%"} mih={"calc(100vh - 60px)"} fluid>
            {children}
          </Container>
        </Flex>
      </Container>
    </>
  );
};

export default DefaultAdmin;
