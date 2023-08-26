import DefaultAdmin from "@/components/templates/DefaultAdmin/DefaultAdmin";
import {
  Badge,
  Box,
  Button,
  Flex,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import React from "react";
import { quizModelProps } from "../../../../../server/models/quiz.model";
import { useGetQuizListPackage } from "@/services/quizService";

interface quizPostDataProps extends Omit<quizModelProps, "package"> {
  package: string;
}

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const TambahSoalAdminPage = () => {
  const { data: quizListPackage } = useGetQuizListPackage();

  const handleSubmitSoal = async (values: any) => {
    console.log(values);
    // try {
    //   const response = await QuizService.postQuiz(values);
    //   if (response.status === 200) {
    //     alert("Berhasil Tambah Soal");
    //   }
    // } catch (error: any) {
    //   alert(error.stack);
    // }
  };

  return (
    <DefaultAdmin title="Tambah Soal">
      <Stack>
        <Text fz={24} fw={500}>
          Tambah Soal
        </Text>
        <Formik
          enableReinitialize
          initialValues={{
            package: "",
            number: 1,
            question: "",
            multiple_choice: ["", "", "", "", ""],
            correct_answer: "",
            score: 0,
          }}
          onSubmit={(values: quizPostDataProps) => handleSubmitSoal(values)}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={12}>
                <Select
                  label="Paket Soal"
                  data={
                    quizListPackage?.map((packageData: any) => {
                      return { value: packageData.package_id, label: packageData.name };
                    }) || []
                  }
                  onChange={e => setFieldValue("package", e)}
                  value={values.package}
                />
                <NumberInput
                  label="Nomor Soal"
                  onChange={e => setFieldValue("number", e)}
                  startValue={1}
                  value={values.number}
                />
                <Box>
                  <Text>Isi Soal</Text>
                  <SunEditor
                    setDefaultStyle="min-height: 150px;"
                    setOptions={{
                      buttonList: [
                        ["undo", "redo", "font", "fontSize", "formatBlock"],
                        [
                          "bold",
                          "underline",
                          "italic",
                          "strike",
                          "subscript",
                          "superscript",
                          "removeFormat",
                        ],
                        ["indent", "align", "horizontalRule", "list", "table"],
                        [
                          "link",
                          "image",
                          "video",
                          "fullScreen",
                          "showBlocks",
                          "codeView",
                          "preview",
                        ],
                      ],
                    }}
                    onChange={e => setFieldValue("question", e)}
                    defaultValue={values.question}
                  />
                </Box>
                <Box>
                  <Text>Pilihan Ganda</Text>
                  <Paper p={12} withBorder>
                    {["A", "B", "C", "D", "E"].map((item, index) => (
                      <Flex key={index} align={"center"} gap={8}>
                        <Badge p={12}>
                          <Text fz={16}>{item}.</Text>
                        </Badge>
                        <SunEditor
                          setDefaultStyle="min-height: 50px;"
                          setOptions={{
                            buttonList: [
                              ["fontSize"],
                              ["bold", "underline", "italic", "strike", "removeFormat"],
                              ["indent", "align", "list", "table"],
                              ["image", "showBlocks", "codeView"],
                            ],
                          }}
                          onChange={e => setFieldValue(`multiple_choice[${index}]`, e)}
                          defaultValue={values.multiple_choice[index]}
                        />
                      </Flex>
                    ))}
                  </Paper>
                </Box>
                <Select
                  label="Jawaban yang benar"
                  data={values.multiple_choice.map((choice: any, index: number) => {
                    return { value: choice !== "" ? choice : index, label: choice };
                  })}
                  onChange={e => setFieldValue("correct_answer", e)}
                  value={values.correct_answer}
                />
                <NumberInput
                  label="Bobot Nilai"
                  onChange={e => setFieldValue("score", e)}
                  value={values.score}
                />
                <Button mt={16} variant="default" type="submit">
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </DefaultAdmin>
  );
};

export default TambahSoalAdminPage;
