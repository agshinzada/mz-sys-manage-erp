import { Button, Form, Input, Modal } from "antd";

const ChangePasswordModal = ({ isOpen, setIsOpen, loading, handleData }) => {
  return (
    <Modal
      title={<p>Şifrə dəyişimi</p>}
      footer={""}
      open={isOpen}
      loading={loading}
      onCancel={() => setIsOpen(false)}
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
        <div className="flex flex-col">
          <Form.Item
            label="Yeni şifrə"
            name="password"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Şifrə təsdiqi"
            name="repassword"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Input.Password />
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

export default ChangePasswordModal;
