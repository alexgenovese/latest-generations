import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />

          <meta property="og:site_name" content={`${process.env.url}`} />
          <meta property="og:title" content={`${process.env.title_og}`} key="title" />
          <meta property="og:description" content={`${process.env.desc_og}`} key="title" />
          
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${process.env.title_og}`} />
          <meta
            name="twitter:description"
            content={`${process.env.desc_og}`}
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
