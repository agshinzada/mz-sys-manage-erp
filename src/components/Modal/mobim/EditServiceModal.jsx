import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

const EditServiceModal = ({
  isOpen,
  setIsOpen,
  loading,
  handleData,
  current,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        name: current.name,
        branches: current.branches,
        departments: current.departments,
        active: current.active,
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
          label="Branches"
          name="branches"
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
          label="Departments"
          name="departments"
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
          label="Status"
          name="active"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Select
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
            options={[
              { value: 0, label: "Active" },
              { value: 1, label: "Passive" },
            ]}
          />
        </Form.Item>
        <div className="flex justify-between">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditServiceModal;
