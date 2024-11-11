import { Button, Form, Input, InputNumber, Modal, Select } from "antd";

const NewStatusModal = ({ handleData, loading, isOpen, setIsOpen }) => {
  return (
    <Modal
      title={<p>Yeni status</p>}
      footer={""}
      loading={loading}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      width={"fit-content"}
      style={{ minWidth: "600px" }}
    >
      <Form
        layout="vertical"
        style={{
          maxWidth: 600,
          marginTop: "1.5rem",
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={handleData}
        autoComplete="off"
      >
        <div className="flex gap-2">
          <Form.Item
            label="STATUS_ID"
            name="statusId"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="NAME"
            name="name"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input your ref!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="TYPE"
            name="type"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex gap-2">
          <Form.Item
            label="COLOR"
            name="color"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="STATUS"
            name="status"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: 0,
                  label: "Aktiv",
                },
                {
                  value: 1,
                  label: "Deaktiv",
                },
              ]}
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewStatusModal;
