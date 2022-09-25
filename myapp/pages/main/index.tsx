import type { NextPage } from "next";
import { notification } from "antd";
import LayoutWrapper from "../../components/LayoutWrapper";
import { useEffect } from "react";
import {
  SessionAuth,
  useSessionContext,
} from "supertokens-auth-react/recipe/session";
import ListCoursesTable from "../../components/ListCourseTable";

const Main: NextPage = () => {
  let session = useSessionContext();

  useEffect(() => {
    if (session.loading) {
      return;
    }
    const { userId } = session;
    let name = userId.slice(0, 5) + "...";
    notification["success"]({
      message: `Welcome ${name}`,
      description: "Courses loaded successfully",
    });
    return;
  }, []);

  return (
    <SessionAuth>
      <LayoutWrapper>
        <ListCoursesTable />
      </LayoutWrapper>
    </SessionAuth>
  );
};

export default Main;
