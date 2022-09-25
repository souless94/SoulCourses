import { Alert, Button, Result } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import LayoutWrapper from "../components/LayoutWrapper";

const Home: NextPage = () => {
  return (
    <SessionAuth>
      <LayoutWrapper>
        <Result
          status="info"
          title="Head Back to Main Page for Exciting Content !"
          subTitle="Please click on the button below to head back !"
          extra={[
            <Button type="primary" key="console">
              <Link href="/main">Go Back</Link>
            </Button>,
          ]}
        />
      </LayoutWrapper>
    </SessionAuth>
  );
};

export default Home;
