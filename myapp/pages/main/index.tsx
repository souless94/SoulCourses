import type { NextPage } from "next";
import { notification } from "antd";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import LayoutWrapper from "../../components/LayoutWrapper";
import { useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const Main: NextPage = () => {
  let session = useSessionContext();
  if (session.loading) {
    return null;
  }
  let { userId } = session;

  useEffect(() => {
    let name = userId.slice(0, 5) + "...";
    notification["success"]({
      message: `Welcome ${name}`,
      description: "Courses loaded successfully",
    });
    return;
  }, []);

  return (
    <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
      <LayoutWrapper></LayoutWrapper>
    </ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
  );
};

export default Main;
