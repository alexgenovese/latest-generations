import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="See latest Reica generation - Free Photo, Free Generation."
          />
          <meta property="og:site_name" content="https://latest-generations.getreica.com/" />
          <meta
            property="og:description"
            content="See latest Reica generation - Free Photo, Free Generation."
          />
          <meta property="og:title" content="Reica Latest Generations" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Reica Latest Generations" />
          <meta
            name="twitter:description"
            content="See latest Reica generation - Free Photo, Free Generation."
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
