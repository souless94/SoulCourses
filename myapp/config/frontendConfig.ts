import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [ThirdPartyEmailPasswordReact.Google.init()],
        },
        getRedirectionURL: async (context) => {
          if (context.action === "SUCCESS") {
            if (context.redirectToPath !== undefined) {
              // we are navigating back to where the user was before they authenticated
              return "/main";
            }
            return "/main";
          }
          return undefined;
        },
        style: {
          superTokensBranding: {
            display: "none",
          },
        },
      }),
      SessionReact.init(),
    ],
  };
};
