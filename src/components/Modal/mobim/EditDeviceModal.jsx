import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";

const EditDeviceModal = ({
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
        name: current.SyncHTTP,
        brands: current.Brends,
        deviceId: current.Device,
        route: current.RootNo,
        routeType: current.RootType,
        regionType: current.SecCode,
        server: current.ServerName,
        database: current.DatabaseName,
        firmNo: current.FirmNo,
        periodNo: current.PeriodNo,
        regionCode: current.RegionalCode,
        brandCode: current.FirmBrend,
        deviceReg: current.DeviceReg,
        deviceParent: current.ParentDevice,
        username: current.UserName,
        password: current.Password,
        warehouse: current.MainWh,
        virtualWare: current.VirtualWH,
        bozukWare: current.BozukWh,
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
          label="Route Name"
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
          label="Brands"
          name="brands"
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
            label="Device ID"
            name="deviceId"
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
            label="Route"
            name="route"
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
            label="Route Type"
            name="routeType"
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
            label="Region Type"
            name="regionType"
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
            label="PeridNo"
            name="periodNo"
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
            label="Region Code"
            name="regionCode"
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
            label="Brend Code"
            name="brandCode"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Device Reg" name="deviceReg">
            <Input />
          </Form.Item>

          <Form.Item label="Device Parent" name="deviceParent">
            <Input />
          </Form.Item>
        </div>
        <div className="flex gap-2">
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
          <Form.Item
            label="Password"
            name="password"
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

        <div className="flex gap-2">
          <Form.Item
            label="Warehouse"
            className="w-full"
            name="warehouse"
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
            label="Virtual Warehouse"
            className="w-full"
            name="virtualWare"
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
            label="Bozuk Warehouse"
            className="w-full"
            name="bozukWare"
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
        </div>
      </Form>
    </Modal>
  );
};

export default EditDeviceModal;
