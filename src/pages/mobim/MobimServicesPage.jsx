import { Badge, Button, Table } from "antd";
import PageTitle from "../../utils/PageTitle";
import SearchForm from "../../utils/SearchForm";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ServiceInfoButton from "../../utils/ServiceInfoButton";
import {
  fetchServices,
  fetchServiceTasks,
  fetchServiceTasksByParam,
} from "../../services/mobim/services_service";
import formatDateTime, {
  formatDate,
  formatDateTimeStamp,
} from "../../utils/usableFunc";
import TaskOperationForm from "../../components/Form/TaskOperationForm";

const MobimServicesPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [services, setServices] = useState([]);
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
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setCurrentConnection(record);
              setEditIsOpen(true);
            }}
          >
            {record.id}
          </Button>
        </>
      ),
    },
    {
      title: "REGION",
      dataIndex: "REGION_NAME",
      key: "REGION_NAME",
    },
    {
      title: "BRAND",
      dataIndex: "BRAND_NAME",
      key: "BRAND_NAME",
    },
    {
      title: "TARİX",
      dataIndex: "date_",
      key: "date_",
      render: (date) => formatDate(date, -4),
    },
    {
      title: "STATUS",
      dataIndex: "active",
      key: "active",
      ellipsis: true,
      render: (status) => (
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold">{getStatus(status)}</span>
          <Badge status="processing" />
        </div>
      ),
    },
    {
      title: "SATIŞ VƏ QAYTARMA",
      dataIndex: "task1",
      key: "task1",
      render: (status) => (
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold">{getStatus(status)}</span>
          <Badge status="processing" />
        </div>
      ),
    },
    {
      title: "KASSA",
      dataIndex: "task2",
      key: "task2",
      ellipsis: true,
      render: (status) => (
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold">{getStatus(status)}</span>
          <Badge status="processing" />
        </div>
      ),
    },
    {
      title: "ANBAR QƏBZİ",
      dataIndex: "task3",
      key: "task3",
      ellipsis: true,
      render: (status) => (
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold">{getStatus(status)}</span>
          <Badge status="processing" />
        </div>
      ),
    },
    // {
    //   title: "BAŞLAMA TARİXİ",
    //   dataIndex: "begTime",
    //   key: "begTime",
    //   render: (date) => formatDateTimeStamp(date, -4),
    // },
    // {
    //   title: "BİTİŞ TARİXİ",
    //   dataIndex: "endTime",
    //   key: "endTime",
    //   render: (date) => formatDateTimeStamp(date, -4),
    // },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

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
    const data = await fetchServiceTasksByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchServiceTasks(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getServices() {
    setLoading(true);
    const data = await fetchServices(user.TOKEN);
    setServices(data);
    setLoading(false);
  }

  function getStatus(status) {
    switch (parseInt(status)) {
      case 0:
        return "active";

      case 1:
        return "passive";

      default:
        return "running";
    }
  }

  useEffect(() => {
    getData();
    getServices();
  }, []);
  return (
    <div>
      <PageTitle title={"servislər"} />
      <div className="flex gap-10 flex-col">
        <TaskOperationForm setLoading={setLoading} loading={loading} />
        <div className="flex justify-between">
          <SearchForm onFinish={onFinish} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 justify-center my-6">
          {services.map((item) => (
            <ServiceInfoButton
              title={item.name}
              status={item.active}
              key={item.id}
              data={item}
              loading={loading}
            />
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <Button onClick={() => setNewIsOpen(true)} type="primary">
            Yeni Task
          </Button>
          <Button
            onClick={() => {
              getServices();
              getData();
            }}
            loading={loading}
          >
            Yenilə
          </Button>
        </div>
      </div>

      <div>
        <p className="font-bold mb-2">TASKLAR</p>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={true}
          rowKey={(record) => record.id}
          loading={loading}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          // scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default MobimServicesPage;
