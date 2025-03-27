import { useEffect, useState } from "react";
import PageTitle from "../../utils/PageTitle";
import { Button, Form, Input, notification, Table, Tag } from "antd";
import NewUserModal from "../../components/Modal/archive/NewUserModal";
import {
  fetchArchiveUsers,
  fetchArchiveUsersByParam,
  fetchPostArchiveUser,
  fetchUpdateArchiveUser,
  fetchUpdateArchiveUserPassword,
} from "../../services/archive/user_service";
import bcrypt from "bcryptjs";
import { useAuth } from "../../context/AuthContext";
import ChangePasswordModal from "../../components/Modal/ChangePasswordModal";
import EditUserModal from "../../components/Modal/archive/EditUserModal";
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlinePassword } from "react-icons/md";

const ArchiveUsersPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // EDIT USER
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  // NEW USER
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  // CHANGE PASS
  const [changePassIsOpen, setChangePassIsOpen] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Name",
      dataIndex: "NAME",
      key: "NAME",
    },
    {
      title: "Surname",
      dataIndex: "SURNAME",
      key: "SURNAME",
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

    {
      title: "Actions",
      dataIndex: "active",
      key: "active",
      render: (_, record) => (
        <div className="">
          <Button
            size="small"
            className="mr-2"
            icon={<BsPencilSquare />}
            onClick={() => {
              setCurrentUser(record);
              setEditIsOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            icon={<MdOutlinePassword />}
            onClick={() => {
              setCurrentUser(record);
              setChangePassIsOpen(true);
            }}
          >
            Şifrəni dəyiş
          </Button>
        </div>
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

  async function handlePassword(params) {
    setLoadingFetch(true);
    if (params.password === params.repassword) {
      const hashedPass = bcrypt.hashSync(
        params.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
      await fetchUpdateArchiveUserPassword(
        { password: hashedPass },
        currentUser.ID,
        user.TOKEN
      );
    } else {
      notification.warning({ message: "Şifrələr eyni deyil" });
    }
    setLoadingFetch(false);
    getData();
  }

  async function handleUser(params) {
    setLoadingFetch(true);
    await fetchUpdateArchiveUser(params, currentUser.ID, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function handleNewUser(params) {
    setLoadingFetch(true);
    const hashedPass = bcrypt.hashSync(
      params.password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    params.password = hashedPass;
    await fetchPostArchiveUser(params, user.TOKEN);
    setLoadingFetch(false);
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
        handleData={handleNewUser}
        isOpen={newIsOpen}
        setIsOpen={setNewIsOpen}
        loading={loadingFetch}
      />
      <EditUserModal
        handleData={handleUser}
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        loading={loadingFetch}
        current={currentUser}
      />
      <ChangePasswordModal
        isOpen={changePassIsOpen}
        setIsOpen={setChangePassIsOpen}
        handleData={handlePassword}
        loading={loadingFetch}
      />
    </div>
  );
};

export default ArchiveUsersPage;
