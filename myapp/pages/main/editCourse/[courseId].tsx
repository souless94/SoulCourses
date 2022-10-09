import Title from "antd/lib/typography/Title";
import { NextPage } from "next";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import EditCourseForm from "../../../components/EditCourseForm";
import LayoutWrapper from "../../../components/LayoutWrapper";

const editCoursePage: NextPage = () => {
  return (
    <SessionAuth>
      <LayoutWrapper>
        <Title>Edit Course</Title>
        <div className="py-4">
          <EditCourseForm />
        </div>
      </LayoutWrapper>
    </SessionAuth>
  );
};

export default editCoursePage;
