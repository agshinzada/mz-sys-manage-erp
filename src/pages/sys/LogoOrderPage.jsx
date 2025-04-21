import { Button, DatePicker, Form, Segmented, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import {
  fetchLogoOrdersByFilter,
  fetchLogoOrdersBySearch,
} from "../../services/logo_service";
import PageTitle from "../../utils/PageTitle";
import SearchForm from "../../utils/SearchForm";

const LogoOrderPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const today = new Date();

  const columns = [
    {
      title: "Status",
      dataIndex: "DOCODE",
      key: "DOCODE",
      render: (_, { DOCODE }) => (
        <>
          <Tag color="green" key={DOCODE}>
            {DOCODE}
          </Tag>
        </>
      ),
    },
    {
      title: "Fiche",
      dataIndex: "FICHENO",
      key: "FICHENO",
    },
    {
      title: "Code",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "Definition",
      dataIndex: "DEFINITION_",
      key: "DEFINITION_",
    },
    {
      title: "TOTAL",
      dataIndex: "NETTOTAL",
      key: "NETTOAL",
    },
    {
      title: "RUT",
      dataIndex: "RUT",
      key: "RUT",
      render: (_, { RUT }) => (
        <>
          <Tag color="blue" key={RUT}>
            {RUT}
          </Tag>
        </>
      ),
    },
    {
      title: "DELIVERY",
      dataIndex: "DELIVERY",
      key: "DELIVERY",
      render: (_, { DELIVERY }) => (
        <>
          <Tag color="blue" key={DELIVERY}>
            {DELIVERY}
          </Tag>
        </>
      ),
    },
    {
      title: "DATE",
      dataIndex: "DATE_",
      key: "DATE_",
      render: (_, { DATE_ }) => <>{new Date(DATE_).toLocaleDateString("az")}</>,
    },
  ];

  async function getOrders(param) {
    setLoading(true);
    const data = await fetchLogoOrdersByFilter(param, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function getOrdersBySearch(param) {
    setLoading(true);
    const data = await fetchLogoOrdersBySearch(param.value, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getOrders({
      from: new Date().toLocaleDateString("az"),
      to: new Date().toLocaleDateString("az"),
      status: "YENI",
    });
  }, []);

  return (
    <div>
      <PageTitle title={"logo sifariş paneli"} />
      <div className="flex justify-between items-center">
        <SearchForm onFinish={getOrdersBySearch} placeholder="Müştəri kodu" />
        <Form
          name="logoorderfilter"
          onFinish={(params) =>
            getOrders({
              from: new Date(params.date[0].$d).toLocaleDateString("az"),
              to: new Date(params.date[1].$d).toLocaleDateString("az"),
              status: params.status,
            })
          }
          initialValues={{
            date: [dayjs(today), dayjs(today)],
            status: "YENI",
          }}
        >
          <Form.Item
            name="date"
            className="w-full mb-3"
            rules={[
              {
                required: true,
                message: "Input your value",
              },
            ]}
          >
            <RangePicker className="w-full" />
          </Form.Item>
          <div className="flex gap-2 items-center">
            <Form.Item
              name="status"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Input your value",
                },
              ]}
            >
              <Segmented options={["YENI", "ERR_WH", "ERR_CNG", "ISLEM"]} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" loading={loading}>
                Yenilə
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={true}
          rowKey={(record) => record.FICHENO}
          loading={loading}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default LogoOrderPage;
