import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="2PI, Yield Maximizer" />
          <meta name="theme-color" content="#0f80aa" />

          <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" sizes="any" />
          <link rel="icon" type="image/png" href="/images/favicon.png" sizes="64x64" />
          <link rel="apple-touch-icon" href="/images/logo192.png" sizes="192x192" />
          <link rel="manifest" href="/manifest.json" />

          <meta property="og:local" content="en_US" />
          <meta property="og:title" content="2PI" />
          <meta property="og:description" content="Yield Maximizer" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://app.2pi.network" />
          <meta property="og:image" content="https://app.2pi.network/images/logo512.png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
