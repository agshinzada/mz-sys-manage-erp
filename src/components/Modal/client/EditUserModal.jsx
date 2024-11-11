import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";

const EditUserModal = ({ isOpen, setIsOpen, loading, handleData, current }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        username: current?.USERNAME,
        ref: current?.REF,
        role: current?.ROLE,
        status: current?.STATUS,
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

export default EditUserModal;
