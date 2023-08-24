import Default from "@/components/templates/Default/Default";
import { Box, Button, Divider, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import React from "react";

const HomePage = () => {
  return (
    <Default title="Raja Ujian">
      <Stack>
        <Paper p={16} withBorder>
          <Stack spacing={12}>
            <Flex justify={"space-between"}>
              <Group>
                <Text>Kelompok Soal</Text>
                <Text>CPNS</Text>
              </Group>
              <Group>
                <Text>Mata Pelajaran</Text>
                <Text>CPNS 2021 TRY OUT</Text>
              </Group>
            </Flex>
            <Divider />
            <Group>
              <Text>Paket Soal</Text>
              <Text>CPNS 2021 TRY OUT</Text>
            </Group>
          </Stack>
        </Paper>
        <Paper p={16} withBorder>
          <Stack spacing={12}>
            <Text>Soal Nomor 1/50</Text>
            <Divider />
            <Box mb={64}>
              <Text>
                Tabungan Ayu Rp2.000,00 lebih banyak daripada tabungan Bagus. Tabungan Cinta
                sebanyak tiga kali tabungan Bagus ditambah dengan Ayu. Jika jumlah tabungan mereka
                bertiga adalah Rp70.000,00 berapa rupiah tabungan Cinta?
              </Text>
            </Box>
            <Text fs={"italic"}>Pilih jawaban berikut :</Text>
            <Stack spacing={8}>
              <Paper p={12} bg={"#D6E6F2"} radius={4} withBorder>
                <Flex>
                  <Text>A.</Text>
                  <Text>Rp 11.000.000</Text>
                </Flex>
              </Paper>
              <Paper p={12} radius={4} withBorder>
                <Flex>
                  <Text>B.</Text>
                  <Text>Rp 11.000.000</Text>
                </Flex>
              </Paper>
              <Paper p={12} radius={4} withBorder>
                <Flex>
                  <Text>C.</Text>
                  <Text>Rp 11.000.000</Text>
                </Flex>
              </Paper>
              <Paper p={12} radius={4} withBorder>
                <Flex>
                  <Text>D.</Text>
                  <Text>Rp 11.000.000</Text>
                </Flex>
              </Paper>
              <Paper p={12} radius={4} withBorder>
                <Flex>
                  <Text>E.</Text>
                  <Text>Rp 11.000.000</Text>
                </Flex>
              </Paper>
            </Stack>
          </Stack>
        </Paper>
        <Paper p={16} withBorder>
          <Stack spacing={12}>
            <Text>Jawaban Anda adalah A</Text>
            <Divider />
            <Flex justify={"space-between"}>
              <Group>
                <Button variant="default">Soal Sebelumnya</Button>
                <Button variant="default">Soal Berikutnya</Button>
              </Group>
              <Button variant="default">Selesai</Button>
            </Flex>
          </Stack>
        </Paper>
      </Stack>
    </Default>
  );
};

export default HomePage;
