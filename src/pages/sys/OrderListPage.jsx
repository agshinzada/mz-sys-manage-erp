import { Button, Form, Input, Popconfirm, Select, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  fetchChangeOrderStatus,
  fetchOrderLinesById,
  fetchOrders,
  fetchOrdersByParam,
} from "../../services/order_service";
import formatDateTime from "../../utils/usableFunc";
import OrderLineModal from "../../components/Modal/OrderLineModal";
import DeviceDetailModal from "../../components/Modal/DeviceDetailModal";
import { fetchDeviceById } from "../../services/device_service";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../utils/PageTitle";
import OrderConfirmTimer from "../../components/tools/OrderConfirmTimer";

const OrderListPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [isOpenlines, setIsOpenlines] = useState(false);
  const [lineModalLoading, setLineModalLoading] = useState(true);
  const [lineData, setLineData] = useState([]);

  const [isOpenDevice, setIsOpenDevice] = useState(false);
  const [deviceModalLoading, setDeviceModalLoading] = useState(true);
  const [deviceData, setDeviceData] = useState([]);

  const columns = [
    {
      title: "Orderkind",
      dataIndex: "orderkind",
      key: "orderkind",
      ellipsis: true,

      render: (_, record) => (
        <>
          <Tag color={record?.ORDERKIND_COLOR}>{record?.ORDERKIND_NAME}</Tag>
        </>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      render: (_, record) => (
        <>
          <Popconfirm
            title="Sifariş statusu yeniləməsi"
            onConfirm={() => reloadOrder(record.record_id)}
            onCancel={() => deleteOrder(record.record_id)}
            okText="Yenidən yüklə"
            cancelText="Sifarişi ləğv et"
          >
            <Tag color={record?.STATUS_COLOR} className="cursor-pointer">
              {record?.STATUS_NAME}
            </Tag>
          </Popconfirm>
        </>
      ),
    },

    {
      title: "Brend",
      dataIndex: "BRAND_NAME",
      key: "BRAND_NAME",
      ellipsis: true,
      render: (_, { BRAND_NAME }) => (
        <>
          <Tag color="blue">{BRAND_NAME}</Tag>
        </>
      ),
    },
    {
      title: "Rut",
      dataIndex: "SPECODE",
      key: "SPECODE",
      ellipsis: true,
      render: (_, { SPECODE }) => (
        <>
          <Tag color="blue">{SPECODE}</Tag>
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
      dataIndex: "order_id",
      key: "order_id",
      render: (text) => <a onClick={() => openLinesModal(text)}>{text}</a>,
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
      title: "Insert date",
      dataIndex: "InsertedDate",
      key: "InsertedDate",
      render: (_, { InsertedDate }) => <>{formatDateTime(InsertedDate, -4)}</>,
    },
    {
      title: "Promo",
      dataIndex: "promostatus",
      key: "promostatus",
      render: (_, { promostatus }) => (
        <>
          <Tag color="blue" key={promostatus}>
            {promostatus === 0 ? "STANDART" : "ENDİRİMLİ"}
          </Tag>
        </>
      ),
    },
    {
      title: "Speccode",
      dataIndex: "specode",
      key: "specode",
      render: (_, { specode }) => (
        <>
          <Tag color="green" key={specode}>
            {specode}
          </Tag>
        </>
      ),
    },
    {
      title: "Record id",
      dataIndex: "record_id",
      key: "record_id",
    },
  ];

  async function getOrders() {
    setLoading(true);
    const data = await fetchOrders(user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function openLinesModal(record) {
    setLineModalLoading(true);
    setIsOpenlines(true);
    const data = await fetchOrderLinesById(record, user.TOKEN);
    setLineData(data);
    setLineModalLoading(false);
  }

  async function openDeviceModal(record) {
    setDeviceModalLoading(true);
    setIsOpenDevice(true);
    const data = await fetchDeviceById(record, user.TOKEN);
    setDeviceData(data);
    setDeviceModalLoading(false);
  }

  async function onFinish(params) {
    setLoading(true);
    const data = await fetchOrdersByParam(params, user.TOKEN);
    setDataSource(data);
    setLoading(false);
  }

  async function reloadOrder(id) {
    Swal.fire({
      text: "Sifariş yenidən yüklənəcək!",
      showCancelButton: true,
      confirmButtonText: "Bəli",
      cancelButtonText: "İmtina",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetchChangeOrderStatus(
          {
            recordId: id,
            status: 0,
          },
          user.TOKEN
        );
        if (res.error) {
          Swal.fire("Sistem xətası", res.response.ErrorMessage, "error");
        } else {
          Swal.fire("Status güncəlləndi!", "", "success");
        }
      }
    });
  }
  async function deleteOrder(id) {
    Swal.fire({
      title: "Sifariş ləğv ediləcək!",
      showCancelButton: true,
      confirmButtonText: "Bəli",
      cancelButtonText: "İmtina",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetchChangeOrderStatus(
          {
            recordId: id,
            status: 499,
          },
          user.TOKEN
        );
        if (res.error) {
          Swal.fire("Sistem xətası", res.response.ErrorMessage, "error");
        } else {
          Swal.fire("Status güncəlləndi!", "", "success");
        }
      }
    });
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <PageTitle title={"sifariş paneli"} />
      <OrderConfirmTimer />
      <div className="flex justify-between items-center">
        <Form
          name="orderfilter"
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
                  {
                    value: 5,
                    label: "Status",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Value"
              name="value"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Input your value",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item className="self-end">
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </div>
        </Form>
        <Button onClick={getOrders} loading={loading}>
          Yenilə
        </Button>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={(record) => record.record_id}
          loading={loading}
          pagination={{ pageSize: 50 }}
          // scroll={{ x: "max-content" }}
        />
      </div>
      <OrderLineModal
        isOpen={isOpenlines}
        setIsOpen={setIsOpenlines}
        setLoading={setLineModalLoading}
        loading={lineModalLoading}
        data={lineData}
      />
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

export default OrderListPage;
