import { Button, Form, Input, Select, Space, Table, Tag } from "antd";
import React, { useState } from "react";

const columns = [
  {
    title: "Record id",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Brend id",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Device id",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Order id",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Client code",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Promo",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Orderkind",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Insert date",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Speccode",
    dataIndex: "address",
    key: "address",
  },
];

const OrderListPage = () => {
  const [dataSource, setDataSource] = useState([]);

  function onFinish(params) {}

  return (
    <div>
      <div>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="flex gap-5">
            <Form.Item
              label="Param"
              name="param"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Select
                defaultValue={4}
                options={[
                  {
                    value: 1,
                    label: "Record id",
                  },
                  {
                    value: 2,
                    label: "Device id",
                  },
                  {
                    value: 3,
                    label: "Order id",
                  },
                  {
                    value: 4,
                    label: "Client code",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Value"
              name="value"
              rules={[
                {
                  required: true,
                  message: "Input your value",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item className="self-end">
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default OrderListPage;
