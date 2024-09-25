import type { AppProps } from "next/app";
import "../styles/index.css";
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <Analytics />
    <GoogleAnalytics gaId="G-123456" />
  </>;
}
