import Default from "@/components/templates/Default/Default";
import React from "react";
import { Form, Formik } from "formik";
import { Button, Center, PasswordInput, Stack, TextInput } from "@mantine/core";

const RegisterPage = () => {
  // const handleRegister = async (values: RegisterProps) => {
  //   try {
  //     const response = await AuthService.Register(values);
  //     if (response.status === 200) {
  //       alert("Berhasil Register!");
  //       localStorage.setItem("at", response.data.data.access_token);
  //       onRegister(response.data.data);
  //       console.log(response.data);
  //     }
  //   } catch (error: any) {
  //     alert(error.stack);
  //     console.error(error.stack);
  //   }
  // };

  return (
    <Default title="Register">
      <Center h={"70vh"}>
        <Formik
          enableReinitialize
          initialValues={{ username: "", password: "" }}
          onSubmit={(values: any) => console.log(values)}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form className="w-[300px]" onSubmit={handleSubmit}>
              <Stack>
                <Stack gap={4}>
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
                  Register
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Center>
    </Default>
  );
};

export default RegisterPage;
