import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditBrandModal from "../../components/Modal/client/EditBrandModal";
import NewBrandModal from "../../components/Modal/client/NewBrandModal";
import PageTitle from "../../utils/PageTitle";
import SearchForm from "../../utils/SearchForm";
import {
  fetchPostSysBrand,
  fetchSysBrands,
  fetchSysBrandsByParam,
  fetchUpdateSysBrand,
} from "../../services/sys_service";
import { BsPencilSquare } from "react-icons/bs";

const SysBrandPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // EDIT BRAND
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(false);
  // NEW BRAND
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Ad",
      dataIndex: "NAME",
      key: "NAME",
    },
    {
      title: "Kateqoriya",
      dataIndex: "BRAND_TYPE",
      key: "BRAND_TYPE",
    },
    {
      title: "Kod",
      dataIndex: "BRAND_CODE",
      key: "BRAND_CODE",
    },
    {
      title: "SYS_ID",
      key: "SYS_ID",
      dataIndex: "SYS_ID",
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
              setCurrentBrand(record);
              setEditIsOpen(true);
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  async function handleBrand(params) {
    setLoadingFetch(true);
    await fetchUpdateSysBrand(params, currentBrand.ID, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function handleNewBrand(params) {
    setLoadingFetch(true);
    await fetchPostSysBrand(params, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchSysBrandsByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchSysBrands(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"brendlər"} />
      <div className="flex justify-between mb-5 items-center">
        <SearchForm onFinish={onFinish} />
        <div className="flex gap-2 items-center">
          <Button onClick={() => setNewIsOpen(true)} type="primary">
            Yeni Brend
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
      <EditBrandModal
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        current={currentBrand}
        handleData={handleBrand}
        loading={loadingFetch}
      />
      <NewBrandModal
        isOpen={newIsOpen}
        setIsOpen={setNewIsOpen}
        handleData={handleNewBrand}
        loading={loadingFetch}
      />
    </div>
  );
};

export default SysBrandPage;
