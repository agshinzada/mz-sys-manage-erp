import { Button, Popconfirm, Table, Tag } from "antd";
import PageTitle from "../../utils/PageTitle";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import SearchForm from "../../utils/SearchForm";
import {
  fetchDeleteDevice,
  fetchDevices,
  fetchDevicesByParam,
  fetchPostNewDevice,
  fetchPutDevice,
} from "../../services/mobim/device_service";
import EditDeviceModal from "../../components/Modal/mobim/EditDeviceModal";
import { useSite } from "../../context/SiteContext";
import CopyDeviceModal from "../../components/Modal/mobim/CopyDeviceModal";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";

const MobimDevicePage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const { regions } = useSite();

  // EDIT DEVICE
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(false);
  const [copyDevice, setCopyDevice] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  // COPY DEVICE
  const [copyIsOpen, setCopyIsOpen] = useState(false);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCopyDevice(...selectedRows);
    },
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "Device",
      key: "Device",
    },
    {
      title: "REGION",
      dataIndex: "RegionalCode",
      key: "RegionalCode",
      render: (_, { RegionalCode }) => (
        <>
          <Tag color="blue" key={RegionalCode}>
            {regions.find((rg) => rg.SYS_ID === parseInt(RegionalCode))?.NAME}
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
              setCurrentDevice(record);
              setEditIsOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="Cihaz silinəcək"
            onConfirm={deleteDevice}
            // onCancel={cancel}
            okText="Bəli"
            cancelText="İmtina"
          >
            <Button size="small" icon={<MdDelete />} danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  async function handleDevice(params) {
    setLoadingFetch(true);
    await fetchPutDevice(params, currentDevice.rec_id, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function handleCopy(params) {
    setLoadingFetch(true);
    await fetchPostNewDevice(params, user.TOKEN);
    setLoadingFetch(false);
    setCopyIsOpen(false);
    getData();
  }

  async function deleteDevice() {
    setLoadingFetch(true);
    Swal.fire({
      text: "Cihaz sistemdən silinsin?",
      showCancelButton: true,
      confirmButtonText: "Bəli",
      cancelButtonText: "İmtina",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetchDeleteDevice(currentDevice.rec_id, user.TOKEN);
        setEditIsOpen(false);
        setLoadingFetch(false);
        getData();
      }
      setLoadingFetch(false);
    });
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
          <Button
            onClick={() => setCopyIsOpen(true)}
            type="primary"
            disabled={!copyDevice}
          >
            Kopyala
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
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          scroll={{ x: "max-content" }}
        />
      </div>
      <EditDeviceModal
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        loading={loadingFetch}
        handleData={handleDevice}
        current={currentDevice}
        handleDelete={deleteDevice}
      />
      <CopyDeviceModal
        isOpen={copyIsOpen}
        setIsOpen={setCopyIsOpen}
        loading={loadingFetch}
        handleData={handleCopy}
        current={copyDevice}
      />
    </div>
  );
};

export default MobimDevicePage;
