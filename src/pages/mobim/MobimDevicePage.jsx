import { Button, Table, Tag } from "antd";
import PageTitle from "../../utils/PageTitle";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import SearchForm from "../../utils/SearchForm";
import {
  fetchDevices,
  fetchDevicesByParam,
} from "../../services/mobim/device_service";
import { regions } from "../../utils/variables";

const MobimDevicePage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // EDIT BRAND
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(false);
  // NEW BRAND
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "Device",
      key: "Device",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setCurrentDevice(record);
              setEditIsOpen(true);
            }}
          >
            {record.Device}
          </Button>
        </>
      ),
    },
    {
      title: "REGION",
      dataIndex: "RegionalCode",
      key: "RegionalCode",
      render: (_, { RegionalCode }) => (
        <>
          <Tag color="blue" key={RegionalCode}>
            {regions.find((br) => br.id === parseInt(RegionalCode))?.name}
          </Tag>
        </>
      ),
    },
    {
      title: "ROUTE",
      dataIndex: "RootNo",
      key: "RootNo",
    },
    {
      title: "Ad",
      dataIndex: "SyncHTTP",
      key: "SyncHTTP",
    },
  ];

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
    const data = await fetchDevicesByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchDevices(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"cihazlar"} />
      <div className="flex justify-between items-center">
        <SearchForm onFinish={onFinish} />
        <div className="flex gap-2 items-center">
          <Button onClick={() => setNewIsOpen(true)} type="primary">
            Yeni Cihaz
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
          pagination={true}
          rowKey={(record) => record.rec_id}
          loading={loading}
          // scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default MobimDevicePage;
