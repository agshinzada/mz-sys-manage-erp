import { useEffect, useState } from "react";
import PageTitle from "../../utils/PageTitle";
import { Button, Table, Tag } from "antd";
import { useAuth } from "../../context/AuthContext";
import SearchForm from "../../utils/SearchForm";
import {
  fetchNewOrderkind,
  fetchNewStatus,
  fetchPutSysOrderkind,
  fetchPutSysStatus,
  fetchSysOrderkindCodes,
  fetchSysOrderkindCodesByParam,
  fetchSysStatusCodes,
  fetchSysStatusCodesByParam,
} from "../../services/sys_service";
import NewStatusModal from "../../components/Modal/NewStatusModal";
import EditStatusModal from "../../components/Modal/EditStatusModal";

const OrderkindCodesPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(false);
  const { user } = useAuth();

  const columns = [
    {
      title: "STATUS_ID",
      dataIndex: "STATUS_ID",
      key: "STATUS_ID",
    },
    {
      title: "NAME",
      dataIndex: "NAME",
      key: "NAME",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setCurrentStatus(record);
              setEditIsOpen(true);
            }}
          >
            {record.NAME}
          </Button>
        </>
      ),
    },
    {
      title: "COLOR",
      dataIndex: "COLOR",
      key: "COLOR",
    },
    {
      title: "STATUS",
      key: "STATUS",
      dataIndex: "STATUS",
      render: (id) => <Tag color="blue">{id === 0 ? "AKTIV" : "DEAKTIV"}</Tag>,
    },
  ];
  async function getData() {
    setLoading(true);
    const data = await fetchSysOrderkindCodes(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function onSearch(params) {
    setLoading(true);
    const data = await fetchSysOrderkindCodesByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function postStatus(params) {
    setLoading(true);
    await fetchNewOrderkind(params, user.TOKEN);
    setLoading(false);
    getData();
  }
  async function putStatus(params) {
    setLoading(true);
    await fetchPutSysOrderkind(currentStatus.ID, params, user.TOKEN);
    setLoading(false);
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"status kodları"} />
      <div className="flex justify-between items-center">
        <SearchForm onFinish={onSearch} />
        <div className="flex gap-2 items-center">
          <Button onClick={() => setNewIsOpen(true)} type="primary">
            Yeni Status
          </Button>
          <Button onClick={getData} loading={loading}>
            Yenilə
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={(record) => record.ID}
        loading={loading}
        // scroll={{ x: "max-content" }}
      />
      <NewStatusModal
        isOpen={newIsOpen}
        setIsOpen={setNewIsOpen}
        handleData={postStatus}
        loading={loading}
      />
      <EditStatusModal
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        handleData={putStatus}
        loading={loading}
        current={currentStatus}
      />
    </div>
  );
};

export default OrderkindCodesPage;
