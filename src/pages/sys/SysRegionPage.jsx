import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  fetchBrands,
  fetchBrandsByParam,
  fetchPostBrand,
  fetchUpdateBrand,
} from "../../services/client/brand_service";
import { useAuth } from "../../context/AuthContext";
import EditBrandModal from "../../components/Modal/client/EditBrandModal";
import NewBrandModal from "../../components/Modal/client/NewBrandModal";
import PageTitle from "../../utils/PageTitle";
import SearchForm from "../../utils/SearchForm";

const SysRegionPage = () => {
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
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setCurrentBrand(record);
              setEditIsOpen(true);
            }}
          >
            {record.NAME}
          </Button>
        </>
      ),
    },
    {
      title: "Kateqoriya",
      dataIndex: "TYPE",
      key: "TYPE",
    },
    {
      title: "Kod",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "NR",
      key: "NR",
      dataIndex: "NR",
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
  ];

  async function handleBrand(params) {
    setLoadingFetch(true);
    await fetchUpdateBrand(params, currentBrand.ID, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function handleNewBrand(params) {
    setLoadingFetch(true);
    await fetchPostBrand(params, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchBrandsByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchBrands(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"regionlar"} />
      <div className="flex justify-between mb-5 items-center">
        <SearchForm onFinish={onFinish} />
        <div className="flex gap-2 items-center">
          <Button onClick={() => setNewIsOpen(true)} type="primary">
            Yeni Region
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

export default SysRegionPage;
