import { Button, Form, Input, Modal, Select } from "antd";

const NewDiscountModal = ({ isOpen, setIsOpen, loading, handleData }) => {
  return (
    <Modal
      title={<p>Yeni endirim</p>}
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
        <div className="flex gap-4">
          <Form.Item
            label="Kod"
            name="value"
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
            label="Label"
            name="label"
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
          <Form.Item
            label="Brand"
            name="brand"
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
                  label: "Mərkəz",
                },
                {
                  value: 11,
                  label: "Henkel",
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

export default NewDiscountModal;
