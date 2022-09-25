import Title from "antd/lib/typography/Title";
import { NextPage } from "next";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import CreateCourseForm from "../../components/CreateCourseForm";
import LayoutWrapper from "../../components/LayoutWrapper";

const createCoursePage: NextPage = () => {
  return (
    <SessionAuth>
      <LayoutWrapper>
        <Title>Create Course</Title>
        <div className="py-4">
          <CreateCourseForm />
        </div>
      </LayoutWrapper>
    </SessionAuth>
  );
};

export default createCoursePage;
