import Default from "@/components/templates/Default/Default";
import React from "react";
import { Form, Formik } from "formik";
import { Button, Center, Flex, PasswordInput, Stack, TextInput } from "@mantine/core";

const LoginPage = () => {
  return (
    <Default title="Login">
      <Center h={"70vh"}>
        <Formik
          enableReinitialize
          initialValues={{ username: "", password: "" }}
          onSubmit={(values: any) => console.log(values)}
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

export default LoginPage;
