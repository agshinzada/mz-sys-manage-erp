import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";

const EditConnectionModal = ({
  isOpen,
  setIsOpen,
  loading,
  handleData,
  current,
  handleDelete,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        name: current.c_conn_name,
        server: current.c_server,
        database: current.c_database,
        username: current.c_username,
        password: current.c_password,
        firmNo: current.c_firmno,
        period: current.c_period,
        brand: current.c_brend,
      });
    }
  }, [current, form]);

  return (
    <Modal
      title={<p>Düzəliş</p>}
      footer={""}
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
        onFinish={handleData}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
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
          label="Server"
          name="server"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="flex gap-2">
          <Form.Item
            label="Database"
            name="database"
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
            label="Username"
            name="username"
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
        <div className="flex gap-2">
          <Form.Item
            label="FirmNo"
            name="firmNo"
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
            label="Period"
            name="period"
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
            label="Brand"
            name="brand"
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

        <div className="flex justify-between">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
          <Button
            type="primary"
            danger
            loading={loading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditConnectionModal;
