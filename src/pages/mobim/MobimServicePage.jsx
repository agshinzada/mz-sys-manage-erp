import { Button, Popconfirm, Table, Tag } from "antd";
import PageTitle from "../../utils/PageTitle";
import {
  fetchPutService,
  fetchPutServiceStatus,
  fetchServices,
} from "../../services/mobim/services_service";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { IoReloadCircle } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import EditServiceModal from "../../components/Modal/mobim/EditServiceModal";
import Swal from "sweetalert2";

const MobimServicePage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState(true);
  const { user } = useAuth();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Region",
      dataIndex: "branches",
      key: "branches",
    },
    {
      title: "Brands",
      dataIndex: "departments",
      key: "departments",
    },
    {
      title: "Database",
      dataIndex: "sqlDatabase",
      key: "sqlDatabase",
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (_, { active }) => (
        <>
          <Tag color="blue" key={active}>
            {parseInt(active) === 0 ? "AKTIV" : ""}
            {parseInt(active) === 1 ? "DEAKTIV" : ""}
            {parseInt(active) === 2 ? "RUNNING" : ""}
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
              setCurrentData(record);
              setIsOpen(true);
            }}
          >
            Edit
          </Button>

          <Button
            size="small"
            icon={<IoReloadCircle />}
            onClick={() => handleStatus(record.id)}
          >
            Reload
          </Button>
        </div>
      ),
    },
  ];

  async function getData() {
    setLoading(true);
    const data = await fetchServices(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function handleStatus(id) {
    setLoading(true);
    Swal.fire({
      text: "Service yenidən yüklənəcək!",
      showCancelButton: true,
      confirmButtonText: "Bəli",
      cancelButtonText: "İmtina",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetchPutServiceStatus(id, user.TOKEN);
        if (res.error) {
          Swal.fire("Sistem xətası", res.response.ErrorMessage, "error");
        } else {
          Swal.fire("Status güncəlləndi!", "", "success");
          getData();
        }
      }
    });
    setLoading(false);
  }

  async function handleData(params) {
    setLoading(true);
    const res = await fetchPutService(params, currentData.id, user.TOKEN);
    if (res.error) {
      Swal.fire("Sistem xətası", res.response.ErrorMessage, "error");
    } else {
      Swal.fire("Service güncəlləndi!", "", "success");
      setIsOpen(false);
    }
    setLoading(false);
    getData();
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title={"servislər"} />
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
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={(record) => record.id}
        loading={loading}
        scroll={{ x: "max-content" }}
      />
      <EditServiceModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        loading={loading}
        current={currentData}
        handleData={handleData}
      />
    </div>
  );
};

export default MobimServicePage;
