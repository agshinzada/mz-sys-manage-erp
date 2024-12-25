import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

const NewStatusModal = ({
  handleData,
  loading,
  current,
  isOpen,
  setIsOpen,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        statusId: current?.STATUS_ID,
        name: current?.NAME,
        type: current?.TYPE,
        color: current?.COLOR,
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
                message: "Required!",
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
                message: "Required!",
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
                message: "Required!",
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

export default NewStatusModal;
