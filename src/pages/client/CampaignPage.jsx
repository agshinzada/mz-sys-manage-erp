import { Button, Form, Input, Segmented, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  fetchCampaign,
  fetchCampaignByParam,
  fetchPostCampaign,
  fetchUpdateCampaign,
} from "../../services/client/campaign_service";
import { useAuth } from "../../context/AuthContext";
import EditCampaignModal from "../../components/Modal/client/EditCampaignModal";
import NewCampaignModal from "../../components/Modal/client/NewCampaignModal";
import PageTitle from "../../utils/PageTitle";
import SearchForm from "../../utils/SearchForm";
import { BsPencilSquare } from "react-icons/bs";

const CampaignPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // EDIT DISCOUNT
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(false);
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
      dataIndex: "CODE",
      key: "CODE",
    },

    {
      title: "Value",
      dataIndex: "VALUE",
      key: "VALUE",
    },
    {
      title: "Explanation",
      dataIndex: "EXPLANATION",
      key: "EXPLANATION",
    },

    {
      title: "Type",
      dataIndex: "TYPE_",
      key: "TYPE_",
      render: (_, { TYPE_ }) => (
        <>
          <Tag color="blue" key={TYPE_}>
            {TYPE_}
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
              setCurrentCampaign(record);
              setEditIsOpen(true);
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  async function handleCampaign(params) {
    setLoadingFetch(true);
    await fetchUpdateCampaign(params, currentCampaign.ID, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function handleNewCampaign(params) {
    setLoadingFetch(true);
    await fetchPostCampaign(params, user.TOKEN);
    setLoadingFetch(false);
    getData();
  }

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchCampaignByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchCampaign(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function handleFilter(value) {
    setLoading(true);
    const data = await fetchCampaign(user.TOKEN);
    const filter = data.filter((item) => item.TYPE_ === value);
    setDataSource(filter);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"kampaniyalar"} />

      <div className="flex justify-between items-center">
        <SearchForm onFinish={onFinish} />

        <div className="flex gap-8 items-center">
          <Segmented
            options={[
              {
                label: "Özəl kod 3",
                value: 3,
              },
              {
                label: "Özəl kod 4",
                value: 4,
              },
              {
                label: "Özəl kod 5",
                value: 5,
              },
            ]}
            onChange={handleFilter}
          />
          <div className="flex gap-2 items-center">
            <Button onClick={() => setNewIsOpen(true)} type="primary">
              Yeni Kampaniya
            </Button>
            <Button onClick={getData} loading={loading}>
              Yenilə
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey={(record) => record.ID}
          loading={loading}
          scroll={{ x: "max-content" }}
        />
      </div>
      <EditCampaignModal
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        current={currentCampaign}
        handleData={handleCampaign}
        loading={loadingFetch}
      />
      <NewCampaignModal
        isOpen={newIsOpen}
        setIsOpen={setNewIsOpen}
        handleData={handleNewCampaign}
        loading={loadingFetch}
      />
    </div>
  );
};

export default CampaignPage;
