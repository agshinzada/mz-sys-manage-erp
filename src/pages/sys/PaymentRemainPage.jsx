import { Button, Form, Select, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { fetchPaymentRemain } from "../../services/payment_service";
import { DatePicker } from "antd";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../utils/PageTitle";

const PaymentRemainPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const columns = [
    {
      title: "Bölgə",
      dataIndex: "BOLGE",
      key: "BOLGE",
    },
    {
      title: "RUT",
      dataIndex: "RUT",
      key: "RUT",
    },
    {
      title: "Açıqlama",
      dataIndex: "ACIQLAMA",
      key: "ACIQLAMA",
    },
    {
      title: "Məbləğ",
      dataIndex: "QALIQ",
      key: "QALIQ",
      render: (_, { QALIQ }) => (
        <>
          {QALIQ > 0 ? (
            <Tag color="blue" className="text-[15px]" key={QALIQ}>
              {QALIQ}
            </Tag>
          ) : (
            <Tag color="red" className="text-[15px]" key={QALIQ}>
              {QALIQ}
            </Tag>
          )}
        </>
      ),
    },
  ];

  async function getPayments() {
    setLoading(true);
    const data = await fetchPaymentRemain(
      {
        date: new Date().toLocaleDateString("az"),
        region: "BAKU",
      },
      user.TOKEN
    );
    setDataSource(data);
    setLoading(false);
  }

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchPaymentRemain(
      {
        region: params.region,
        date: new Date(params.date.$d).toLocaleDateString("az"),
      },
      user.TOKEN
    );
    setDataSource(data);
    setLoading(false);
  }

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div>
      <PageTitle title={"kassa qalığı"} />
      <div className="flex justify-between items-center">
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
            region: "BAKU",
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="flex gap-2">
            <Form.Item
              label="Region"
              name="region"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Select
                options={[
                  {
                    value: "BAKU",
                    label: "BAKI",
                  },
                  {
                    value: "LENKERAN",
                    label: "LƏNKƏRAN",
                  },
                  {
                    value: "GOYCAY",
                    label: "GÖYÇAY",
                  },
                  {
                    value: "BERDE",
                    label: "BƏRDƏ",
                  },
                  {
                    value: "XACMAZ",
                    label: "XAÇMAZ",
                  },
                  {
                    value: "SHEKI",
                    label: "ŞƏKİ",
                  },
                  {
                    value: "GENCE",
                    label: "GƏNCƏ",
                  },
                  {
                    value: "SHIRVAN",
                    label: "ŞİRVAN",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Tarix"
              name="date"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Input your value",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item className="self-end">
              <Button type="primary" htmlType="submit">
                Filter
              </Button>
            </Form.Item>
          </div>
        </Form>
        <Button onClick={getPayments} loading={loading}>
          Yenilə
        </Button>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey={(record) => record.RUT}
          loading={loading}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default PaymentRemainPage;
