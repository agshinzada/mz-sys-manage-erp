import { Button, Form, Input, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { fetchBrandsByParam } from "../../services/client/brand_service";
import { useAuth } from "../../context/AuthContext";

import PageTitle from "../../utils/PageTitle";
import {
  fetchClientLogs,
  fetchClientLogsBySearch,
} from "../../services/client/log_service";
import SearchForm from "../../utils/SearchForm";

const LogPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const columns = [
    {
      title: "User_ID",
      dataIndex: "USER_ID",
      key: "USER_ID",
    },
    {
      title: "USERNAME",
      dataIndex: "USERNAME",
      key: "USERNAME",
    },

    {
      title: "Kod",
      dataIndex: "CODE",
      key: "CODE",
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: "OLD_DEFINITION_",
      key: "OLD_DEFINITION_",
      dataIndex: "OLD_DEFINITION_",
    },
    {
      title: "NEW_DEFINITION_",
      key: "NEW_DEFINITION_",
      dataIndex: "NEW_DEFINITION_",
    },
    {
      title: "OLD_TAXNR",
      key: "OLD_TAXNR",
      dataIndex: "OLD_TAXNR",
    },
    {
      title: "NEW_TAXNR",
      key: "NEW_TAXNR",
      dataIndex: "NEW_TAXNR",
    },

    {
      title: "DATE",
      dataIndex: "DATE",
      key: "DATE",
      render: (_, { DATE }) => <>{new Date(DATE).toLocaleDateString("az")}</>,
    },
  ];

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchClientLogsBySearch(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchClientLogs(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"loglar"} />
      <div className="flex justify-between mb-5 items-center">
        <SearchForm onFinish={onFinish} />

        <div className="flex gap-2 items-center">
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
          rowKey={(record) => record.ID}
          loading={loading}
          // scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default LogPage;
