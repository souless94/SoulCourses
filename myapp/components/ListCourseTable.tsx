import { Button, Table, TableProps } from "antd";
import { NextPage } from "next";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface AppCourseInterface {
  _id: string;
  key: string;
  title: string;
  description: number;
  url: string;
}

const columns: ColumnsType<AppCourseInterface> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: (a, b) => a.title - b.title,
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
    sorter: (a, b) => a.url - b.url,
    filters: [],
    filterMode: "menu",
    filterSearch: true,
    onFilter: (value: string, record) => record.url.includes(value),
  },

  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <>
        <Button type="primary" ghost>
          <Link href={`/main/editCourse/${record._id}`}>Edit</Link>
        </Button>
        <br />
        <Button danger>Delete</Button>
      </>
    ),
  },
];
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
  const endpoint = "/api/AppCourses";

  const options = {
    method: "GET",
  };
  const fetchData = async () => {
    const response = await fetch(endpoint, options);

    setData(await response.json());
  };

  useEffect(() => {
    // API endpoint where we send form data.

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
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: () => true,
          }}
          bordered
          onChange={onChange}
        />
      </div>
      ;
    </>
  );
};

export default ListCoursesTable;
