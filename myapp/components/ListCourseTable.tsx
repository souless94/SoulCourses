import { Button, notification, Popconfirm, Table, TableProps } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { NextPage } from "next";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { targetCourseInput } from "../data/AppCoursesDto";

interface AppCourseInterface {
  _id: string;
  key: string;
  title: string;
  description: number;
  url: string;
}

const onChange: TableProps<AppCourseInterface>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const ListCoursesTable: NextPage = () => {
  let [data, setData] = useState([]);

  const columns: ColumnsType<AppCourseInterface> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filters: data.map((item: AppCourseInterface) => ({
        text: item.title,
        value: item.title,
      })),
      filterMode: "menu",
      filterSearch: true,
      onFilter: (
        searchTerm: string | number | boolean,
        record: AppCourseInterface
      ) => record.title.includes(searchTerm.toString()),
      sorter: (a: AppCourseInterface, b: AppCourseInterface) =>
        a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      filters: data.map((item: AppCourseInterface) => ({
        text: item.url,
        value: item.url,
      })),
      filterMode: "menu",
      filterSearch: true,
      onFilter: (
        searchTerm: string | number | boolean,
        record: AppCourseInterface
      ) => record.url.includes(searchTerm.toString()),
      sorter: (a: AppCourseInterface, b: AppCourseInterface) =>
        a.url.localeCompare(b.url),
    },

    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="primary" ghost>
            <Link href={`/main/editCourse/${record._id}`}>Edit</Link>
          </Button>
          <br />
          <Popconfirm
            title="Are you sure？"
            onConfirm={() => deleteCourse(`${record._id}`)}
            icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    const endpoint = "/api/AppCourses";
    const options = {
      method: "GET",
      timeout: 5000,
    };
    const response = await fetch(endpoint, options);

    setData(await response.json());
  };

  const deleteCourse = async (_id: string) => {
    const endpoint = "/api/AppCourses";

    const values: targetCourseInput = { _id: _id };

    const JSONdata = JSON.stringify(values);

    // Send the data to the server in JSON format.

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
      timeout: 5000,
    };
    const response = await fetch(endpoint, options);

    if (response.status === 204) {
      notification["success"]({
        message: "Course Deleted",
        description: `${_id} course Deleted`,
      });
    } else {
      const result = await response.json();
      notification["error"]({
        message: "Error Deleting Course",
        description: `${result.message} `,
      });
    }

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Button type="primary">
        <Link href="/main/createCourse">Create Courses</Link>
      </Button>
      <div className="py-4">
        <Table
          dataSource={data}
          columns={columns}
          bordered
          onChange={onChange}
        />
      </div>
      ;
    </>
  );
};

export default ListCoursesTable;
