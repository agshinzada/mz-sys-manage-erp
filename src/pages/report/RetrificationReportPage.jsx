import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../utils/PageTitle";
import { Button, Table, Tag } from "antd";
import SearchForm from "../../utils/SearchForm";
import { fetchReportRetrification } from "../../services/report/report_service";

const RetrificationReportPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const columns = [
    {
      title: "Faktura növü",
      dataIndex: "FICHE_TYPE",
      key: "FICHE_TYPE",
      render: (id) => (
        <Tag color="blue">{id === 3 ? "Borc dekontu" : "Alacak dekontu"}</Tag>
      ),
    },
    {
      title: "Faktura nömrəsi",
      dataIndex: "FICHENO",
      key: "FICHENO",
    },
    {
      title: "Region",
      dataIndex: "REGION_STATUS",
      key: "REGION_STATUS",
      render: (id) => (
        <Tag color="blue">{id === 0 ? "OK" : "REGİON SƏHV QEYD EDİLİB"}</Tag>
      ),
    },
    {
      title: "Brend",
      dataIndex: "BRAND_STATUS",
      key: "BRAND_STATUS",
      render: (id) => (
        <Tag color="blue">{id === 0 ? "OK" : "BREND SƏHV QEYD EDİLİB"}</Tag>
      ),
    },
    {
      title: "Müştəri kodu",
      key: "CODE_STATUS",
      dataIndex: "CODE_STATUS",
      render: (id) => (
        <Tag color="blue">
          {id === 0 ? "OK" : "MÜŞTƏRİ KODU SƏHV QEYD EDİLİB"}
        </Tag>
      ),
    },
    {
      title: "Tarix",
      dataIndex: "DATE_",
      key: "DATE_",
      render: (date) => new Date(date).toLocaleDateString("az"),
    },
  ];
  async function getData() {
    setLoading(true);
    const data = await fetchReportRetrification(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function onFinish(params) {
    // setLoading(true);
    // const data = await fetchBrandsByParam(params.value, user.TOKEN);
    // setDataSource(data);
    // setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {" "}
      <PageTitle title={"düzəliş aktı"} />
      <div className="flex justify-between mb-5 items-center">
        <SearchForm onFinish={onFinish} />

        <div className="flex gap-2 items-center">
          <Button onClick={getData} loading={loading}>
            Yenilə
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={(record) => record.ID}
        loading={loading}
        // scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default RetrificationReportPage;
