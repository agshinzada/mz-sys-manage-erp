import { Button, Table } from "antd";
import PageTitle from "../../utils/PageTitle";
import SearchForm from "../../utils/SearchForm";
import { useEffect, useState } from "react";
import {
  fetchConnections,
  fetchConnectionsByParam,
  fetchDeleteConnection,
  fetchPostNewConnection,
  fetchPutConnection,
} from "../../services/mobim/connection_service";
import { useAuth } from "../../context/AuthContext";
import CopyConnectionModal from "../../components/Modal/mobim/CopyConnectionModal";
import EditConnectionModal from "../../components/Modal/mobim/EditConnectionModal";
import Swal from "sweetalert2";

const MobimConnectionPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // EDIT CONNECTION
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentConnection, setCurrentConnection] = useState(false);
  // COPY CONNECTION
  const [copyIsOpen, setCopyIsOpen] = useState(false);
  const [copyConnection, setCopyConnection] = useState(false);

  const [loadingFetch, setLoadingFetch] = useState(false);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCopyConnection(...selectedRows);
    },
  };

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

  async function handleConnection(params) {
    setLoadingFetch(true);
    await fetchPutConnection(params, currentConnection.c_id, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function handleCopy(params) {
    setLoadingFetch(true);
    await fetchPostNewConnection(params, user.TOKEN);
    setLoadingFetch(false);
    setCopyIsOpen(false);
    getData();
  }
  async function deleteConnection() {
    setLoadingFetch(true);
    Swal.fire({
      text: "Bağlantı sistemdən silinsin?",
      showCancelButton: true,
      confirmButtonText: "Bəli",
      cancelButtonText: "İmtina",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetchDeleteConnection(currentConnection.c_id, user.TOKEN);
        setEditIsOpen(false);
        setLoadingFetch(false);
        getData();
      }
      setLoadingFetch(false);
    });
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
          <Button
            onClick={() => setCopyIsOpen(true)}
            type="primary"
            disabled={!copyConnection}
          >
            Kopyala
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
          rowKey={(record) => record.c_id}
          loading={loading}
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
        />
      </div>
      <CopyConnectionModal
        current={copyConnection}
        isOpen={copyIsOpen}
        setIsOpen={setCopyIsOpen}
        handleData={handleCopy}
        loading={loadingFetch}
      />
      <EditConnectionModal
        current={currentConnection}
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        handleData={handleConnection}
        handleDelete={deleteConnection}
        loading={loadingFetch}
      />
    </div>
  );
};

export default MobimConnectionPage;
