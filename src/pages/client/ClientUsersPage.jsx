import { Button, notification, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  fetchPostUser,
  fetchUpdateUser,
  fetchUpdateUserPassword,
  fetchUsers,
  fetchUsersByParam,
} from "../../services/client/user_service";
import { useAuth } from "../../context/AuthContext";
import EditUserModal from "../../components/Modal/client/EditUserModal";
import NewUserModal from "../../components/Modal/client/NewUserModal";
import bcrypt from "bcryptjs";
import ChangePasswordModal from "../../components/Modal/ChangePasswordModal";
import PageTitle from "../../utils/PageTitle";
import SearchForm from "../../utils/SearchForm";
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlinePassword } from "react-icons/md";

const ClientUsersPage = () => {
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

  async function handlePassword(params) {
    setLoadingFetch(true);
    if (params.password === params.repassword) {
      const hashedPass = bcrypt.hashSync(
        params.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
      await fetchUpdateUserPassword(
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
    await fetchUpdateUser(params, currentUser.ID, user.TOKEN);
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
    await fetchPostUser(params, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchUsersByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchUsers(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"istifadəçilər"} />
      <div className="flex justify-between items-center">
        <SearchForm onFinish={onFinish} />
        <div className="flex gap-2 items-center">
          <Button onClick={() => setNewIsOpen(true)} type="primary">
            Yeni İstifadəçi
          </Button>
          <Button onClick={getData} loading={loading}>
            Yenilə
          </Button>
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
      <EditUserModal
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        current={currentUser}
        handleData={handleUser}
        loading={loadingFetch}
      />
      <NewUserModal
        isOpen={newIsOpen}
        setIsOpen={setNewIsOpen}
        handleData={handleNewUser}
        loading={loadingFetch}
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

export default ClientUsersPage;
