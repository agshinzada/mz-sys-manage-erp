import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import NewRegionModal from "../../components/Modal/client/NewRegionModal";
import EditRegionModal from "../../components/Modal/client/EditRegionModal";
import PageTitle from "../../utils/PageTitle";
import {
  fetchPostSysRegion,
  fetchSysRegions,
  fetchUpdateSysRegion,
} from "../../services/sys_service";

const SysRegionPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  // EDIT REGION
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(false);
  // NEW REGION
  const [newIsOpen, setNewIsOpen] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const { user } = useAuth();

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
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setCurrentRegion(record);
              setEditIsOpen(true);
            }}
          >
            {record.NAME}
          </Button>
        </>
      ),
    },
    {
      title: "SYS_ID",
      dataIndex: "SYS_ID",
      key: "SYS_ID",
    },
    {
      title: "CODE_ID",
      key: "CODE_ID",
      dataIndex: "CODE_ID",
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

  async function handleRegion(params) {
    setLoadingFetch(true);
    await fetchUpdateSysRegion(params, currentRegion.ID, user.TOKEN);
    setLoadingFetch(false);
    getRegions();
  }

  async function handleNewRegion(params) {
    setLoadingFetch(true);
    await fetchPostSysRegion(params, user.TOKEN);
    setLoadingFetch(false);
    getRegions();
  }

  async function getRegions() {
    setLoading(true);
    const data = await fetchSysRegions(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getRegions();
  }, []);

  return (
    <div>
      <PageTitle title={"regionlar"} />
      <div className="flex justify-end mb-2 items-center gap-3">
        <Button onClick={() => setNewIsOpen(true)} type="primary">
          Yeni bölgə
        </Button>
        <Button onClick={getRegions} loading={loading}>
          Yenilə
        </Button>
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
      <EditRegionModal
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        current={currentRegion}
        handleData={handleRegion}
        loading={loadingFetch}
      />
      <NewRegionModal
        isOpen={newIsOpen}
        setIsOpen={setNewIsOpen}
        handleData={handleNewRegion}
        loading={loadingFetch}
      />
    </div>
  );
};

export default SysRegionPage;
