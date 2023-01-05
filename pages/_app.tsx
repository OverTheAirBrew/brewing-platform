import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { SSRProvider, ThemeProvider } from 'react-bootstrap';

import '../css/main.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>OverTheAirBrew - Brew Platform</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>"
        />
      </Head>
      <SSRProvider>
        <ThemeProvider>
          {/* <FullLayout> */}
          <Component {...pageProps} />
          {/* </FullLayout> */}
        </ThemeProvider>
      </SSRProvider>
    </>
  );
};

export default MyApp;
