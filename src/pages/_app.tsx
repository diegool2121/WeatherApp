import "@/styles/globals.css";
import { AppProps } from "next/app";
import { LanguageProvider } from "../context/LanguageContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;
