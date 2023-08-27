import Default from "@/components/templates/Default/Default";
import React from "react";
import { Form, Formik } from "formik";
import { Button, Center, PasswordInput, Stack, TextInput } from "@mantine/core";
import { AuthService, loginProps } from "@/services/authService/auth";
import { useAuth } from "@/contexts/AuthContext/auth.context";
import { withoutAuth } from "@/contexts/AuthContext/AuthProvider";

const LoginPage = () => {
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
                    onChange={e => setFieldValue("username", e.target.value)}
                    value={values.username}
                  />
                  <PasswordInput
                    label="Password"
                    autoComplete="on"
                    placeholder="password"
                    onChange={e => setFieldValue("password", e.target.value)}
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

export default withoutAuth(LoginPage);
