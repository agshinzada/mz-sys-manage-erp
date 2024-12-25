import { Button, Form, Input, notification, Table, Tag } from "antd";
import { useEffect, useState } from "react";

import {
  fetchNewUser,
  fetchPutSysUser,
  fetchPutSysUserPassword,
  fetchSysUsers,
  fetchSysUsersByParam,
} from "../../services/user_service";
import NewUserModal from "../../components/Modal/NewUserModal";
import EditUserModal from "../../components/Modal/EditUserModal";
import ChangePasswordModal from "../../components/Modal/ChangePasswordModal";
import bcrypt from "bcryptjs";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../utils/PageTitle";

const SysUsersPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [changePassIsOpen, setChangePassIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState(false);
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
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setCurrentData(record);
              setEditIsOpen(true);
            }}
          >
            {record.USERNAME}
          </Button>
        </>
      ),
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
    {
      title: "Pass",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setCurrentData(record);
              setChangePassIsOpen(true);
            }}
          >
            Şifrəni dəyiş
          </Button>
        </>
      ),
    },
  ];

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchSysUsersByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchSysUsers(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function postUser(data) {
    setLoading(true);
    const hashedPass = bcrypt.hashSync(
      data.password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    data.password = hashedPass;
    await fetchNewUser(data, user.TOKEN);
    setLoading(false);
    getData();
  }

  async function putPassword(params) {
    setLoading(true);
    if (params.password === params.repassword) {
      const hashedPass = bcrypt.hashSync(
        params.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
      await fetchPutSysUserPassword(
        currentData.ID,
        { password: hashedPass },

        user.TOKEN
      );
    } else {
      notification.warning({ message: "Şifrələr eyni deyil" });
    }
    setLoading(false);
    getData();
  }

  async function putUser(data) {
    setLoading(true);
    await fetchPutSysUser(currentData.ID, data, user.TOKEN);
    setLoading(false);
    getData();
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
        handleUser={postUser}
        isOpen={newIsOpen}
        setIsOpen={setNewIsOpen}
        loading={loading}
      />
      <EditUserModal
        handleUser={putUser}
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        loading={loading}
        current={currentData}
      />
      <ChangePasswordModal
        isOpen={changePassIsOpen}
        setIsOpen={setChangePassIsOpen}
        handleData={putPassword}
        loading={loading}
      />
    </div>
  );
};

export default SysUsersPage;
