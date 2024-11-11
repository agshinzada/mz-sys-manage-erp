import { Button, List, Modal, Table, Typography } from "antd";

const OrderLineModal = ({ isOpen, setIsOpen, loading, setLoading, data }) => {
  const columns = [
    {
      title: "ISONR",
      dataIndex: "ISONR",
      key: "ISONR",
    },
    {
      title: "CODE",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "NAME",
      dataIndex: "NAME",
      key: "NAME",
    },
    {
      title: "PRODUCERCODE",
      dataIndex: "PRODUCERCODE",
      key: "PRODUCERCODE",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  return (
    <Modal
      title={<p>Order Lines - {data[0]?.order_id}</p>}
      footer={""}
      loading={loading}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      width={"fit-content"}
      style={{ minWidth: "600px" }}
    >
      {/*  */}
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered={true}
      />
    </Modal>
  );
};

export default OrderLineModal;
