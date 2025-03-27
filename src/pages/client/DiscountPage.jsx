import { Button, Form, Input, Table, Tag } from "antd";
import { useEffect, useState } from "react";

import {
  fetchDiscounts,
  fetchDiscountsByParam,
  fetchPostDiscount,
  fetchUpdateDiscount,
} from "../../services/client/discount_service";
import { useAuth } from "../../context/AuthContext";
import EditDiscountModal from "../../components/Modal/client/EditDiscountModal";
import NewDiscountModal from "../../components/Modal/client/NewDiscountModal";
import PageTitle from "../../utils/PageTitle";
import SearchForm from "../../utils/SearchForm";
import { BsPencilSquare } from "react-icons/bs";

const DiscountPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // EDIT DISCOUNT
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState(false);
  // NEW DISCOUNT
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Code",
      dataIndex: "VALUE",
      key: "VALUE",
    },

    {
      title: "Label",
      dataIndex: "LABEL",
      key: "LABEL",
    },
    {
      title: "Brand",
      dataIndex: "BRAND_ID",
      key: "BRAND_ID",
      render: (_, { BRAND_ID }) => (
        <>
          <Tag color="blue" key={BRAND_ID}>
            {BRAND_ID}
          </Tag>
        </>
      ),
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
              setCurrentDiscount(record);
              setEditIsOpen(true);
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  async function handleDiscount(params) {
    setLoadingFetch(true);
    await fetchUpdateDiscount(params, currentDiscount.ID, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function handleNewDiscount(params) {
    setLoadingFetch(true);
    await fetchPostDiscount(params, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchDiscountsByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchDiscounts(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"endirimlər"} />
      <div className="flex justify-between items-center">
        <SearchForm onFinish={onFinish} />
        <div className="flex gap-2 items-center">
          <Button onClick={() => setNewIsOpen(true)} type="primary">
            Yeni Endirim
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
      <EditDiscountModal
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        current={currentDiscount}
        handleData={handleDiscount}
        loading={loadingFetch}
      />
      <NewDiscountModal
        isOpen={newIsOpen}
        setIsOpen={setNewIsOpen}
        handleData={handleNewDiscount}
        loading={loadingFetch}
      />
    </div>
  );
};

export default DiscountPage;
