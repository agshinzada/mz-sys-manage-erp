import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import PageTitle from "../../utils/PageTitle";
import {
  fetchClientLogs,
  fetchClientLogsBySearch,
} from "../../services/client/log_service";
import SearchForm from "../../utils/SearchForm";
import {
  fetchArchiveLogs,
  fetchArchiveLogsBySearch,
} from "../../services/archive/log_service";
import formatDateTime from "../../utils/usableFunc";

const ArchiveLogPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const columns = [
    {
      title: "EXTRACTED_FICHENO",
      dataIndex: "EXTRACTED_FICHENO",
      key: "EXTRACTED_FICHENO",
      render: (_, { EXTRACTED_FICHENO }) => (
        <>
          <Tag color="gray" key={EXTRACTED_FICHENO}>
            {EXTRACTED_FICHENO}
          </Tag>
        </>
      ),
    },
    {
      title: "EXTRACTED_TYPE",
      dataIndex: "EXTRACTED_TYPE",
      key: "EXTRACTED_TYPE",
    },

    {
      title: "GENERATED_FILENAME",
      dataIndex: "GENERATED_FILENAME",
      key: "GENERATED_FILENAME",
    },
    {
      title: "ORG_FILENAME",
      key: "ORG_FILENAME",
      dataIndex: "ORG_FILENAME",
    },
    {
      title: "FILEPATH",
      key: "FILEPATH",
      dataIndex: "FILEPATH",
    },
    {
      title: "LOGTYPE",
      key: "LOGTYPE",
      dataIndex: "LOGTYPE",
      render: (_, { LOGTYPE }) => (
        <>
          <Tag color={`${LOGTYPE === 1 ? "green" : "red"}`} key={LOGTYPE}>
            {LOGTYPE === 1 ? "SUCCESS" : "UNREAD"}
          </Tag>
        </>
      ),
    },
    {
      title: "INSERT_DATE",
      key: "INSERT_DATE",
      dataIndex: "INSERT_DATE",
      render: (_, { INSERT_DATE }) => <>{formatDateTime(INSERT_DATE, -4)}</>,
    },
  ];

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchArchiveLogsBySearch(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchArchiveLogs(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"loglar"} />
      <div className="flex justify-between items-center">
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
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default ArchiveLogPage;
