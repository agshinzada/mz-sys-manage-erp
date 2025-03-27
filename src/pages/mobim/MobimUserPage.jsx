import { Button, Popconfirm, Table, Tag } from "antd";
import PageTitle from "../../utils/PageTitle";
import { useEffect, useState } from "react";
import { fetchMobimUsers } from "../../services/mobim/mobim_service";
import { useAuth } from "../../context/AuthContext";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const MobimUserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const columns = [
    {
      title: "ID",
      dataIndex: "rec_id",
      key: "rec_id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Type",
      dataIndex: "u_cat",
      key: "u_cat",
    },
    {
      title: "Database",
      dataIndex: "c_conn_name",
      key: "c_conn_name",
    },
  ];

  async function getData() {
    setLoading(true);
    const data = await fetchMobimUsers(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title={"istifadəçilər"} />
        <Button
          type="primary"
          onClick={() => {
            getData();
          }}
          loading={loading}
        >
          Yenilə
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={(record) => record.rec_id}
        loading={loading}
        // scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default MobimUserPage;
