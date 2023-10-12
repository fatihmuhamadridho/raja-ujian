import Footer from "@/components/organisms/Footer/Footer";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Container } from "@mantine/core";
import Head from "next/head";
import React from "react";

interface DefaultProps {
  title: string;
  children?: React.ReactNode;
}

const Default = (props: DefaultProps) => {
  const { title, children } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container fluid p={0}>
        <Navbar />
        <Container
          py={32}
          px={16}
          maw={900 + 16}
          mih={"calc(100vh - 60px - 50px)"}
          fluid
        >
          {children}
        </Container>
        <Footer />
      </Container>
    </>
  );
};

export default Default;
