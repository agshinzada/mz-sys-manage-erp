import { Button, Form, Input, InputNumber, Modal, Select } from "antd";

const NewUserModal = ({ handleUser, loading, isOpen, setIsOpen }) => {
  return (
    <Modal
      title={<p>Yeni istifadəçi</p>}
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
        onFinish={handleUser}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="flex gap-4">
          <Form.Item
            label="LOGO ref"
            name="logoRef"
            rules={[
              {
                required: true,
                message: "Please input your ref!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
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

        <Form.Item
          label="Role"
          name="role"
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
                value: "ADMIN",
                label: "Admin",
              },
              {
                value: "MODERATOR",
                label: "Moderator",
              },
            ]}
          />
        </Form.Item>

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
