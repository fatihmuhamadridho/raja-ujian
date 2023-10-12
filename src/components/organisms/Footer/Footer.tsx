import React from "react";
import { Center, Container, Text } from "@mantine/core";

const Footer = () => {
  return (
    <Container fluid h={50} bg={"#769FCD"}>
      <Center h={"100%"}>
        <Text fz={12} color="white">
          @copyright by Fatih Muhamad Ridho
        </Text>
      </Center>
    </Container>
  );
};

export default Footer;
