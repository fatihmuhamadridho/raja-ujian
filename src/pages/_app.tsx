import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "suneditor/dist/css/suneditor.min.css";
import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@/contexts/Auth/AuthProvider";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({});
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 5 * 6 * 1000,
      },
    },
  });

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
