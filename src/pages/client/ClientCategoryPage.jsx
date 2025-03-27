import { Button, Form, Input, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  fetchClientCategory,
  fetchClientCategoryByParam,
  fetchPostClientCategory,
  fetchUpdateClientCategory,
} from "../../services/client/clcategory_service";
import { useAuth } from "../../context/AuthContext";
import EditCategoryModal from "../../components/Modal/client/EditCategoryModal";
import NewCategoryModal from "../../components/Modal/client/NewCategoryModal";
import PageTitle from "../../utils/PageTitle";
import SearchForm from "../../utils/SearchForm";
import { BsPencilSquare } from "react-icons/bs";

const ClientCategoryPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // EDIT CATEGORY
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(false);
  // NEW CATEGORY
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Name",
      dataIndex: "NAME",
      key: "NAME",
    },

    {
      title: "Code",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "ABBR",
      key: "ABBR",
      dataIndex: "ABBR",
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

  async function handleCategory(params) {
    setLoadingFetch(true);
    await fetchUpdateClientCategory(params, currentBrand.ID, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function handleNewCategory(params) {
    setLoadingFetch(true);
    await fetchPostClientCategory(params, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchClientCategoryByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchClientCategory(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"müştəri kateqoriyaları"} />

      <div className="flex justify-between items-center">
        <SearchForm onFinish={onFinish} />

        <div className="flex gap-2 items-center">
          <Button onClick={() => setNewIsOpen(true)} type="primary">
            Yeni Kateqoriya
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
      <EditCategoryModal
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        current={currentBrand}
        handleData={handleCategory}
        loading={loadingFetch}
      />
      <NewCategoryModal
        isOpen={newIsOpen}
        setIsOpen={setNewIsOpen}
        handleData={handleNewCategory}
        loading={loadingFetch}
      />
    </div>
  );
};

export default ClientCategoryPage;
