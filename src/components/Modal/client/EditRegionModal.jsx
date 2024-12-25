import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";

const EditRegionModal = ({
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
        name: current?.NAME,
        sysId: current?.SYS_ID,
        codeId: current?.CODE_ID,
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
        <Form.Item
          label="Bölgə adı"
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
        <div className="flex gap-4">
          <Form.Item
            label="SYS ID"
            name="sysId"
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
            label="Code ID"
            name="codeId"
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

export default EditRegionModal;
