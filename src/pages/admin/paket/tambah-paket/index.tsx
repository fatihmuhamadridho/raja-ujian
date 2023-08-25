import DefaultAdmin from "@/components/templates/DefaultAdmin/DefaultAdmin";
import { Button, Stack, Text, TextInput } from "@mantine/core";
import { Form, Formik } from "formik";
import React from "react";
import { packageModelProps } from "../../../../../server/models/package.model";

const TambahPaketAdminPage = () => {
  return (
    <DefaultAdmin title="Tambah Paket">
      <Stack>
        <Text fz={24} fw={500}>
          Tambah Paket
        </Text>
        <Formik
          initialValues={{ name: "", group: "" }}
          onSubmit={(values: packageModelProps) => console.log(values)}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <TextInput label="Name" onChange={e => setFieldValue("name", e.target.value)} />
              <TextInput label="Group" onChange={e => setFieldValue("group", e.target.value)} />
              <Button mt={16} variant="default" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </DefaultAdmin>
  );
};

export default TambahPaketAdminPage;
