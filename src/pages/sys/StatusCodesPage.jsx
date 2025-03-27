import { useEffect, useState } from "react";
import PageTitle from "../../utils/PageTitle";
import { Button, Table, Tag } from "antd";
import { useAuth } from "../../context/AuthContext";
import SearchForm from "../../utils/SearchForm";
import {
  fetchNewStatus,
  fetchPutSysStatus,
  fetchSysStatusCodes,
  fetchSysStatusCodesByParam,
} from "../../services/sys_service";
import NewStatusModal from "../../components/Modal/NewStatusModal";
import EditStatusModal from "../../components/Modal/EditStatusModal";
import { BsPencilSquare } from "react-icons/bs";

const StatusCodesPage = () => {
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
              setCurrentStatus(record);
              setEditIsOpen(true);
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];
  async function getData() {
    setLoading(true);
    const data = await fetchSysStatusCodes(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function onSearch(params) {
    setLoading(true);
    const data = await fetchSysStatusCodesByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function postStatus(params) {
    setLoading(true);
    await fetchNewStatus(params, user.TOKEN);
    setLoading(false);
    getData();
  }
  async function putStatus(params) {
    setLoading(true);
    await fetchPutSysStatus(currentStatus.ID, params, user.TOKEN);
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
          {" "}
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

export default StatusCodesPage;
