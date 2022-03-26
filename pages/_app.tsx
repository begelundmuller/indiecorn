import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default App;
