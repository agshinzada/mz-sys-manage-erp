import { Button, Form, Input, InputNumber, Modal, Select } from "antd";

const NewRegionModal = ({ isOpen, setIsOpen, loading, handleData }) => {
  return (
    <Modal
      title={<p>Yeni region</p>}
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

export default NewRegionModal;
