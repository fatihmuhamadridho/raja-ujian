import Default from "@/components/templates/Default/Default";
import React from "react";
import { Form, Formik } from "formik";
import { Button, Center, PasswordInput, Stack, TextInput } from "@mantine/core";
import { AuthService, loginProps } from "@/services/authService";
import { useAuth } from "@/contexts/Auth/auth.context";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const { onLogin } = useAuth();

  const handleLogin = async (values: loginProps) => {
    try {
      const response = await AuthService.login(values);
      if (response.status === 200) {
        onLogin(response.data.data);
        localStorage.setItem("access_token", response.data.data.access_token);
        alert("Berhasil login!");
        window.location.href = "/";
        console.log(response.data.data);
      }
    } catch (error: any) {
      alert(error.stack);
      console.error(error.stack);
    }
  };

  return (
    <Default title="Login">
      <Center h={"70vh"}>
        <Formik
          enableReinitialize
          initialValues={{ username: "", password: "" }}
          onSubmit={(values: any) => handleLogin(values)}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form className="w-[300px]" onSubmit={handleSubmit}>
              <Stack>
                <Stack spacing={4}>
                  <TextInput
                    label="Username"
                    placeholder="username"
                    onChange={(e) => setFieldValue("username", e.target.value)}
                    value={values.username}
                  />
                  <PasswordInput
                    label="Password"
                    autoComplete="on"
                    placeholder="password"
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    value={values.password}
                  />
                </Stack>
                <Button type="submit" variant="default">
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Center>
    </Default>
  );
};

export default LoginPage;
