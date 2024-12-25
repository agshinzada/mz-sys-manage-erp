import { Button, Form, Input, Select, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import formatDateTime from "../../utils/usableFunc";
import {
  fetchPayments,
  fetchPaymentsByParam,
} from "../../services/payment_service";
import DeviceDetailModal from "../../components/Modal/DeviceDetailModal";
import { fetchDeviceById } from "../../services/device_service";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../utils/PageTitle";

const PaymentListPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [isOpenDevice, setIsOpenDevice] = useState(false);
  const [deviceModalLoading, setDeviceModalLoading] = useState(true);
  const [deviceData, setDeviceData] = useState([]);

  const columns = [
    {
      title: "Record id",
      dataIndex: "rec_i",
      key: "rec_i",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Brend",
      dataIndex: "BRAND_NAME",
      key: "BRAND_NAME",
      render: (_, { BRAND_NAME }) => (
        <>
          <Tag color="blue">{BRAND_NAME}</Tag>
        </>
      ),
    },
    {
      title: "Device id",
      dataIndex: "device_id",
      key: "device_id",
      render: (text) => <a onClick={() => openDeviceModal(text)}>{text}</a>,
    },
    {
      title: "Order id",
      dataIndex: "payment_id",
      key: "payment_id",
    },
    {
      title: "Client code",
      dataIndex: "clientcode",
      key: "clientcode",
      render: (_, { clientcode }) => (
        <>
          {clientcode === "YUKLEME" ? (
            <Tag color="green" key={clientcode}>
              ANBAR SƏNƏDİ
            </Tag>
          ) : (
            clientcode
          )}
        </>
      ),
    },
    {
      title: "Sign",
      dataIndex: "sign",
      key: "sign",
    },
    {
      title: "Ficheref",
      dataIndex: "ficheref",
      key: "ficheref",
    },
    {
      title: "Trcode",
      dataIndex: "trcode",
      key: "trcode",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, { amount }) => (
        <>
          <Tag color="green" key={amount}>
            {amount}
          </Tag>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          <Tag color={record.STATUS_COLOR}>{record.STATUS_NAME}</Tag>
        </>
      ),
    },
    {
      title: "Insert date",
      dataIndex: "InsertedDate",
      key: "InsertedDate",
      render: (_, { InsertedDate }) => <>{formatDateTime(InsertedDate, -4)}</>,
    },
  ];

  async function getPayments() {
    setLoading(true);
    const data = await fetchPayments(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchPaymentsByParam(params, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function openDeviceModal(record) {
    setDeviceModalLoading(true);
    setIsOpenDevice(true);
    const data = await fetchDeviceById(record, user.TOKEN);
    setDeviceData(data);
    setDeviceModalLoading(false);
  }

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div>
      <PageTitle title={"ödənişlər"} />
      <div className="flex justify-between items-center">
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
            param: 4,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="flex gap-2">
            <Form.Item
              label="Param"
              name="param"
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
                    value: 1,
                    label: "Record id",
                  },
                  {
                    value: 2,
                    label: "Device id",
                  },
                  {
                    value: 3,
                    label: "Order id",
                  },
                  {
                    value: 4,
                    label: "Client code",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Value"
              name="value"
              rules={[
                {
                  required: true,
                  message: "Input your value",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item className="self-end">
              <Button type="primary" htmlType="submit">
                Search
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
          rowKey={(record) => record.record_id}
          loading={loading}
        />
      </div>
      <DeviceDetailModal
        isOpen={isOpenDevice}
        setIsOpen={setIsOpenDevice}
        setLoading={setDeviceModalLoading}
        loading={deviceModalLoading}
        data={deviceData}
      />
    </div>
  );
};

export default PaymentListPage;
