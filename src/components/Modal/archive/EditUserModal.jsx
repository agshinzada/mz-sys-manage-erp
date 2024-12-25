import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

const EditUserModal = ({ isOpen, setIsOpen, loading, handleData, current }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        username: current?.USERNAME,
        name: current?.NAME,
        surname: current?.SURNAME,
        role: current?.ROLE,
        status: current?.STATUS,
      });
    }
  }, [current, form]);

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
        form={form}
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
        <div className="flex gap-4">
          <Form.Item
            label="Name"
            name="name"
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
            label="Surname"
            name="surname"
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
        </div>
        <div className="flex gap-4">
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
        </div>
        <div className="flex gap-4">
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
                {
                  value: "MODERATOR",
                  label: "MODERATOR",
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

export default EditUserModal;
