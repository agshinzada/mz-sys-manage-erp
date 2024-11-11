import { Button, Form, Input, Table, Tag } from "antd";
import { useEffect, useState } from "react";

import {
  fetchDelivery,
  fetchDeliveryByParam,
  fetchPostDelivery,
  fetchUpdateDelivery,
} from "../../services/client/delivery_service";
import { regions } from "../../utils/variables";
import { useAuth } from "../../context/AuthContext";
import EditDeliveryModal from "../../components/Modal/client/EditDeliveryModal";
import NewDeliveryModal from "../../components/Modal/client/NewDeliveryModal";
import PageTitle from "../../utils/PageTitle";
import SearchForm from "../../utils/SearchForm";

const DeliveryPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // EDIT DELIVERY
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentDelivery, setCurrentDelivery] = useState(false);
  // NEW DELIVERY
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
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "Name",
      dataIndex: "NAME",
      key: "NAME",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setCurrentDelivery(record);
              setEditIsOpen(true);
            }}
          >
            {record.NAME}
          </Button>
        </>
      ),
    },
    {
      title: "Region",
      key: "REGION_ID",
      dataIndex: "REGION_ID",
      render: (_, { REGION_ID }) => (
        <>
          <Tag color={"blue"} key={REGION_ID}>
            {regions.find((st) => st.id === parseInt(REGION_ID))?.name ||
              REGION_ID}
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
  ];

  async function handleDelivery(params) {
    setLoadingFetch(true);
    await fetchUpdateDelivery(params, currentDelivery.ID, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function handleNewDelivery(params) {
    setLoadingFetch(true);
    await fetchPostDelivery(params, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchDeliveryByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchDelivery(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"təslimatçılar"} />
      <div className="flex justify-between mb-5 items-center">
        <SearchForm onFinish={onFinish} />

        <div className="flex gap-2 items-center">
          <Button onClick={() => setNewIsOpen(true)} type="primary">
            Yeni Təslimatçı
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
      <EditDeliveryModal
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        current={currentDelivery}
        handleData={handleDelivery}
        loading={loadingFetch}
      />
      <NewDeliveryModal
        isOpen={newIsOpen}
        setIsOpen={setNewIsOpen}
        handleData={handleNewDelivery}
        loading={loadingFetch}
      />
    </div>
  );
};

export default DeliveryPage;
