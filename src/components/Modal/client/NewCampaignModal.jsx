import { Button, Form, Input, Modal, Select } from "antd";

const NewCampaignModal = ({ isOpen, setIsOpen, loading, handleData }) => {
  return (
    <Modal
      title={<p>Yeni kampaniya</p>}
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
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <Form.Item
              label="Kod"
              name="code"
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
              label="Value"
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
          </div>
          <div className="flex gap-3">
            <Form.Item
              label="Explanation"
              name="explanation"
              className="w-full"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
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
                    value: 3,
                    label: "Özəl kod 3",
                  },
                  {
                    value: 4,
                    label: "Özəl kod 4",
                  },
                  {
                    value: 5,
                    label: "Özəl kod 5",
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

export default NewCampaignModal;
