import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";

const NewUserModal = ({ handleUser, loading, isOpen, setIsOpen, current }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        username: current?.USERNAME,
        logoRef: current?.REF,
        role: current?.ROLE,
        status: current?.STATUS,
      });
    }
  }, [current, form]);
  return (
    <Modal
      title={<p>Düzəliş</p>}
      footer={""}
      loading={loading}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      width={"fit-content"}
      style={{ minWidth: "600px" }}
    >
      <Form
        form={form}
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
        <div className="flex gap-2">
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
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}
            className="w-full"
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
          <Form.Item
            label="Status"
            name="status"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Required!",
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

export default NewUserModal;
