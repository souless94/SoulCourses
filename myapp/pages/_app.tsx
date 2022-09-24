import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import { frontendConfig } from "../config/frontendConfig";
import LoaderWrapper from "../components/LoaderWrapper";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoaderWrapper>
      <SuperTokensWrapper>
        <Component {...pageProps} />
      </SuperTokensWrapper>
    </LoaderWrapper>
  );
}

export default MyApp;
