import { useEffect, useState } from "react";
import PageTitle from "../../utils/PageTitle";
import { Button, Table, Tag } from "antd";
import { useAuth } from "../../context/AuthContext";
import SearchForm from "../../utils/SearchForm";
import { fetchSysStatusCodes } from "../../services/sys_service";
import NewStatusModal from "../../components/Modal/NewStatusModal";

const StatusCodesPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newIsOpen, setNewIsOpen] = useState(false);
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
      title: "TYPE",
      dataIndex: "TYPE",
      key: "TYPE",
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
    const data = await fetchSysStatusCodes(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function onFinish(params) {
    // setLoading(true);
    // const data = await fetchBrandsByParam(params.value, user.TOKEN);
    // setDataSource(data);
    // setLoading(false);
  }

  async function handleStatus(params) {
    // setLoading(true);
    // const data = await fetchBrandsByParam(params.value, user.TOKEN);
    // setDataSource(data);
    // setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <PageTitle title={"status kodları"} />
      <div className="flex justify-between mb-5 items-center">
        <SearchForm onFinish={onFinish} />

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
        handleData={handleStatus}
        loading={loading}
      />
    </div>
  );
};

export default StatusCodesPage;
