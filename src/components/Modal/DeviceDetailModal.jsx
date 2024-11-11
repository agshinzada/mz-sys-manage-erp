import { Descriptions, Modal, Table, Tag } from "antd";

const DeviceDetailModal = ({
  isOpen,
  setIsOpen,
  loading,
  setLoading,
  data,
}) => {
  const items = [
    {
      key: "1",
      label: "Rut",
      children: data?.RootNo,
    },
    {
      key: "2",
      label: "Name",
      children: data?.SyncHTTP,
    },
    {
      key: "3",
      label: "Section",
      children: data?.SecCode,
    },
    {
      key: "4",
      label: "Region",
      children: data?.RegionalCode,
    },
    {
      key: "5",
      label: "Brands",
      children: data?.Brends,
    },
  ];

  return (
    <Modal
      title={
        <p>
          Device details -{" "}
          {data?.Device || <Tag color="red">Device id not equal</Tag>}
        </p>
      }
      footer={""}
      loading={loading}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      style={{ minWidth: "600px" }}
    >
      <Descriptions title="" items={items} />
    </Modal>
  );
};

export default DeviceDetailModal;
