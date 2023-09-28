import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import "suneditor/dist/css/suneditor.min.css";
<<<<<<< HEAD
=======
import { AuthProvider } from "@/contexts/Auth/AuthProvider";
>>>>>>> 3f82a7b (feat: 🎸 revamp again)

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 5 * 6 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
