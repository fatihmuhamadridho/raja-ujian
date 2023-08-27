import {
  Button,
  Center,
  Container,
  Flex,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import { Form, Formik } from "formik";
import { loginProps } from "@/services/authService/auth";
import { AuthService } from "@/services/authService/auth";
import { useAuth } from "@/contexts/AuthContext/auth.context";
import Head from "next/head";
import { withoutAdminAuth } from "@/contexts/AuthContext/AuthProvider";

const LoginAdminPage = () => {
  const { onLogin } = useAuth();

  const handleLogin = async (values: loginProps) => {
    try {
      const response = await AuthService.login(values);
      if (response.status === 200) {
        alert("Berhasil login!");
        localStorage.setItem("at", response.data.data.access_token);
        onLogin(response.data.data);
        console.log(response.data);
      }
    } catch (error: any) {
      alert(error.stack);
      console.error(error.stack);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container fluid>
        <Center h={"100vh"}>
          <Flex direction={"column"} gap={16}>
            <Text fz={18} fw={500} transform="uppercase">
              Lakukan login terlebih dahulu
            </Text>
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={(values: loginProps) => handleLogin(values)}
            >
              {({ handleSubmit, values, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <Paper p={16} withBorder>
                    <Flex direction={"column"} gap={4}>
                      <TextInput
                        label="Username"
                        onChange={e => setFieldValue("username", e.target.value)}
                        value={values.username}
                      />
                      <PasswordInput
                        label="Password"
                        autoComplete="on"
                        onChange={e => setFieldValue("password", e.target.value)}
                        value={values.password}
                      />
                      <Button mt={16} variant="default" type="submit">
                        Login
                      </Button>
                    </Flex>
                  </Paper>
                </Form>
              )}
            </Formik>
          </Flex>
        </Center>
      </Container>
    </>
  );
};

export default withoutAdminAuth(LoginAdminPage);
