import { useEffect, useState } from "react";
import PageTitle from "../../utils/PageTitle";
import { Button, Form, Input, Table, Tag } from "antd";
import NewUserModal from "../../components/Modal/archive/NewUserModal";
import {
  fetchArchiveUsers,
  fetchArchiveUsersByParam,
  fetchNewUser,
} from "../../services/archive/user_service";
import bcrypt from "bcryptjs";
import { useAuth } from "../../context/AuthContext";

const ArchiveUsersPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newModalLoading, setNewModalLoading] = useState(false);
  const [newIsOpen, setNewIsOpen] = useState(false);
  const { user } = useAuth();

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Ref",
      dataIndex: "REF",
      key: "REF",
    },

    {
      title: "Username",
      dataIndex: "USERNAME",
      key: "USERNAME",
    },
    {
      title: "Role",
      dataIndex: "ROLE",
      key: "ROLE",
    },

    {
      title: "Status",
      dataIndex: "STATUS",
      key: "STATUS",
      render: (_, { STATUS }) => (
        <>
          <Tag color="blue" key={STATUS}>
            {parseInt(STATUS) === 0 ? "AKTIV" : "DEAKTIV"}
          </Tag>
        </>
      ),
    },
  ];

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchArchiveUsersByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchArchiveUsers(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function handleUser(data) {
    setNewModalLoading(true);
    const hashedPass = bcrypt.hashSync(
      data.password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    data.password = hashedPass;
    await fetchNewUser(data, user.TOKEN);
    setNewModalLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"istifadəçilər"} />
      <div className="flex justify-between mb-5 items-center">
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
        <div className="flex gap-4">
          <Button onClick={() => setNewIsOpen(true)} type="primary">
            Yeni istifadəçi
          </Button>
          <Button onClick={getData}>Yenilə</Button>
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey={(record) => record.ID}
          loading={loading}
          // scroll={{ x: "max-content" }}
        />
      </div>
      <NewUserModal
        handleUser={handleUser}
        isOpen={newIsOpen}
        setIsOpen={setNewIsOpen}
        loading={newModalLoading}
      />
    </div>
  );
};

export default ArchiveUsersPage;
