import { Badge, Button, Popconfirm, Table, Tag } from "antd";
import PageTitle from "../../utils/PageTitle";
import { useEffect, useState } from "react";
import {
  fetchBulkTaskStatus,
  fetchOpenAllTasks,
  fetchPutTaskStatus,
  fetchServiceTasks,
  fetchServiceTasksByParam,
} from "../../services/mobim/services_service";
import { useAuth } from "../../context/AuthContext";
import SearchForm from "../../utils/SearchForm";
import { BsPencilSquare } from "react-icons/bs";
import { IoReloadCircle } from "react-icons/io5";
import { GrTask } from "react-icons/gr";
import { MdAddCircle } from "react-icons/md";
import Swal from "sweetalert2";

const MobimTaskPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [taskArr, setTaskArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tarix",
      dataIndex: "date_",
      key: "date_",
      render: (_, { date_ }) => (
        <Tag color="blue" key={date_}>
          {new Date(date_).toLocaleDateString("az")}
        </Tag>
      ),
    },
    {
      title: "Region",
      dataIndex: "REGION_NAME",
      key: "REGION_NAME",
    },
    {
      title: "Brend",
      dataIndex: "BRAND_NAME",
      key: "BRAND_NAME",
    },

    {
      title: "Sifariş və qaytarma (task1)",
      dataIndex: "task1",
      key: "task1",
      render: (_, { task1 }) => (
        <>
          <Tag color={`${task1 === 0 ? "blue" : "gray"}`} key={task1}>
            {parseInt(task1) === 0 ? "AKTIV" : "PASSIV"}
          </Tag>
        </>
      ),
    },
    {
      title: "Kassa (task2)",
      dataIndex: "task2",
      key: "task2",
      render: (_, { task2 }) => (
        <>
          <Tag color={`${task2 === 0 ? "blue" : "gray"}`} key={task2}>
            {parseInt(task2) === 0 ? "AKTIV" : "PASSIV"}
          </Tag>
        </>
      ),
    },
    {
      title: "Anbar sənədi (task3)",
      dataIndex: "task3",
      key: "task3",
      render: (_, { task3 }) => (
        <>
          <Tag color={`${task3 === 0 ? "blue" : "gray"}`} key={task3}>
            {parseInt(task3) === 0 ? "AKTIV" : "PASSIV"}
          </Tag>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (_, { active }) => (
        <>
          <Button size="small" key={active}>
            {parseInt(active) === 0 ? "active" : ""}
            {parseInt(active) === 1 ? "passive" : ""}
            {parseInt(active) === 2 ? "running" : ""}
            <Badge status="processing" />
          </Button>
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "active",
      key: "active",
      render: (_, record) => (
        <div className="">
          <Popconfirm
            title="Reload"
            description="Task statusu güncəllənəcək"
            onConfirm={() => handleStatus(record.id)}
            // onCancel={cancel}
            okText="Bəli"
            cancelText="İmtina"
          >
            <Button size="small" icon={<IoReloadCircle />}>
              Reload
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  async function getData() {
    setLoading(true);
    const data = await fetchServiceTasks(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchServiceTasksByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function handleCheck(selectedRowKeys) {
    setTaskArr(selectedRowKeys);
  }

  async function handleStatus(id) {
    setLoading(true);
    await fetchPutTaskStatus(id, user.TOKEN);
    getData();
    setLoading(false);
  }

  async function handleBulkReload() {
    setLoading(true);
    await fetchBulkTaskStatus(taskArr, user.TOKEN);
    getData();
    setLoading(false);
  }

  async function activateSystem() {
    setLoading(true);
    await fetchOpenAllTasks(user.TOKEN);
    getData();
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"servislər"} />
      <div className="flex justify-between items-center">
        <SearchForm onFinish={onFinish} />
        <Button
          type="primary"
          onClick={() => {
            getData();
          }}
          loading={loading}
        >
          Yenilə
        </Button>
      </div>
      <div className="flex gap-3 mb-3">
        <Popconfirm
          title="Activate"
          description="Bütün taskların tarixi güncəllənəcək"
          onConfirm={() => activateSystem()}
          // onCancel={cancel}
          okText="Bəli"
          cancelText="İmtina"
        >
          <Button size="small" icon={<GrTask />}>
            Activate all
          </Button>
        </Popconfirm>
        <Popconfirm
          title="Activate"
          description="Seçili taskların statusu güncəllənəcək"
          onConfirm={handleBulkReload}
          // onCancel={cancel}
          okText="Bəli"
          cancelText="İmtina"
        >
          <Button
            size="small"
            icon={<IoReloadCircle />}
            disabled={!taskArr.length}
          >
            Bulk Reload
          </Button>
        </Popconfirm>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={true}
        rowKey={(record) => record.id}
        loading={loading}
        rowSelection={{
          type: "checkbox",
          onChange: handleCheck,
        }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default MobimTaskPage;
