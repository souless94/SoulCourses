import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";
import { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
  return {
    framework: "express",
    supertokens: {
      // These are the connection details of the app you created on supertokens.com
      connectionURI: process.env.SUPER_TOKEN_CONNECTION_URI || "",
      apiKey: process.env.SUPER_TOKEN_API_KEY || "",
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        providers: [
          // We have provided you with development keys which you can use for testing.
          // IMPORTANT: Please replace them with your own OAuth keys for production use.
          ThirdPartyEmailPasswordNode.Google({
            clientId: process.env.SUPER_TOKEN_GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.SUPER_TOKEN_GOOGLE_CLIENT_SECRET || "",
          }),
        ],
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  };
};
