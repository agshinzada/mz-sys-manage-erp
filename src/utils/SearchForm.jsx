import { Button, Form, Input } from "antd";

const SearchForm = ({ onFinish, placeholder = "" }) => {
  return (
    <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
      <div className="flex gap-2">
        <Form.Item
          label="Axtarış"
          name="value"
          rules={[
            {
              required: true,
              message: "Input your value",
            },
          ]}
        >
          <Input allowClear placeholder={placeholder} />
        </Form.Item>
        <Form.Item className="self-end">
          <Button type="primary" htmlType="submit">
            Axtar
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default SearchForm;
