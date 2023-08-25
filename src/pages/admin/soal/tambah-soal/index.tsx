import DefaultAdmin from "@/components/templates/DefaultAdmin/DefaultAdmin";
import { Button, NumberInput, Stack, Text, TextInput } from "@mantine/core";
import { Form, Formik } from "formik";
import React from "react";

const TambahSoalAdminPage = () => {
  return (
    <DefaultAdmin title="Tambah Soal">
      <Stack>
        <Text fz={24} fw={500}>
          Tambah Soal
        </Text>
        <Formik
          initialValues={{ name: "", group: "" }}
          onSubmit={(values: any) => console.log(values)}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <NumberInput label="Nomor Soal" />
              <TextInput label="Isi Soal (rich text editor)" />
              <TextInput label="Pilihan Ganda (Bikin 5 multiple choice)" />
              <TextInput label="Jawaban yang benar" />
              <NumberInput label="Bobot Nilai" />
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

export default TambahSoalAdminPage;
