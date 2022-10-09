import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Button, Form, Input, notification } from "antd";
import { CreateCourseInput } from "../data/AppCoursesDto";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useRouter } from "next/router";

const CreateCourseForm: NextPage = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  let session = useSessionContext();
  if (session.loading) {
    return null;
  }
  let { userId } = session;
  const router = useRouter();
  const { courseId } = router.query;
  const [form] = Form.useForm();

  const fetchData = async () => {
    const endpoint = `/api/AppCourses/${courseId}`;

    const options = {
      method: "GET",
      timeout: 5000,
    };
    await fetch(endpoint, options)
      .then((res) => res.json())
      .then((data) => {
        form.setFieldsValue(data);
      });

    return;
  };

  useEffect(() => {
    fetchData();
  }, []);
  const submitForm = async (values: CreateCourseInput) => {
    values.uploadedby = userId;

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(values);

    // API endpoint where we send form data.
    const endpoint = "/api/AppCourses";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "PATCH",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
      timeout: 5000,
    };
    const response = await fetch(endpoint, options);

    const result = await response.json();

    if (response.status === 200) {
      notification["success"]({
        message: "Course Updated",
        description: `course : ${result.title} was Updated`,
      });
    } else {
      notification["error"]({
        message: "Error updating Course",
        description: `${result.message} `,
      });
    }
  };

  return (
    <>
      <Form form={form} {...layout} onFinish={submitForm}>
        <Form.Item name="_id" label="Id">
          <Input placeholder="id" disabled />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, max: 80, min: 0, type: "string" }]}
          hasFeedback
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: false, type: "string" }]}
          hasFeedback
        >
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item
          name="url"
          label="Url"
          rules={[{ required: true, type: "url" }]}
          hasFeedback
        >
          <Input type="url" placeholder="Url" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit">
            Edit Course
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateCourseForm;
