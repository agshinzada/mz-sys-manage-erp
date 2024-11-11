import { Button, Table } from "antd";
import PageTitle from "../../utils/PageTitle";
import SearchForm from "../../utils/SearchForm";
import { useEffect, useState } from "react";
import {
  fetchConnections,
  fetchConnectionsByParam,
} from "../../services/mobim/connection_service";
import { useAuth } from "../../context/AuthContext";

const MobimConnectionPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // EDIT BRAND
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentConnection, setCurrentConnection] = useState(false);
  // NEW BRAND
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "c_id",
      key: "c_id",
    },
    {
      title: "REGION",
      dataIndex: "c_conn_name",
      key: "c_conn_name",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setCurrentConnection(record);
              setEditIsOpen(true);
            }}
          >
            {record.c_conn_name}
          </Button>
        </>
      ),
    },
    {
      title: "Server",
      dataIndex: "c_server",
      key: "c_server",
    },
    {
      title: "Database",
      dataIndex: "c_database",
      key: "c_database",
    },
    {
      title: "FirmNo",
      dataIndex: "c_firmno",
      key: "c_firmno",
    },
    {
      title: "PeridNo",
      dataIndex: "c_period",
      key: "c_period",
    },
    {
      title: "Department",
      dataIndex: "c_brend",
      key: "c_brend",
    },
    {
      title: "Username",
      dataIndex: "c_username",
      key: "c_username",
    },
    {
      title: "Password",
      dataIndex: "c_password",
      key: "c_password",
    },
  ];

  async function handleBrand(params) {
    setLoadingFetch(true);
    // await fetchUpdateBrand(params, currentBrand.ID, user.TOKEN);
    // setLoadingFetch(false);
    getData();
  }

  async function handleNewBrand(params) {
    setLoadingFetch(true);
    // await fetchPostBrand(params, user.TOKEN);
    // setLoadingFetch(false);
    getData();
  }

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchConnectionsByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchConnections(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"bağlantılar"} />
      <div className="flex justify-between items-center">
        <SearchForm onFinish={onFinish} />
        <div className="flex gap-2 items-center">
          <Button onClick={() => setNewIsOpen(true)} type="primary">
            Yeni Bağlantı
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
          pagination={true}
          rowKey={(record) => record.rec_id}
          loading={loading}

          // scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default MobimConnectionPage;
