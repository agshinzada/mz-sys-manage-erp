import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";

import {
  fetchVisitDay,
  fetchVisitDayByParam,
} from "../../services/client/visit_service";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../utils/PageTitle";
import SearchForm from "../../utils/SearchForm";

const VisitDayPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchVisitDayByParam(params.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchVisitDay(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title={"vizit günləri"} />
      <div className="flex justify-between items-center">
        <SearchForm onFinish={onFinish} />
        <Button onClick={getData}>Yenilə</Button>
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
    </div>
  );
};

export default VisitDayPage;
