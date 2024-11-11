import { Button, Form, Input, InputNumber, Modal, Select } from "antd";

const NewUserModal = ({ isOpen, setIsOpen, loading, handleData }) => {
  return (
    <Modal
      title={<p>Yeni İstifadəçi</p>}
      footer={""}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      loading={loading}
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
        <div className="flex flex-col">
          <Form.Item
            label="Username"
            name="username"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <div className="flex gap-4">
          <Form.Item
            label="LOGO ref"
            name="ref"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "ADMIN",
                  label: "ADMIN",
                },
                {
                  value: "USER",
                  label: "USER",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Required",
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
                  label: "Passiv",
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

export default NewUserModal;
