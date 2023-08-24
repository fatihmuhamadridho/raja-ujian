import React from "react";
import { Center, Footer as FooterCore, Text } from "@mantine/core";

const Footer = () => {
  return (
    <FooterCore height={50} bg={"#769FCD"}>
      <Center h={"100%"}>
        <Text fz={12} color="white">
          @copyright by Fatih Muhamad Ridho
        </Text>
      </Center>
    </FooterCore>
  );
};

export default Footer;
