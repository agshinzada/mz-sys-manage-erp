import { Badge, Button } from "antd";

const ServiceInfoButton = ({ title, status, data, loading }) => {
  const getStatus = () => {
    switch (parseInt(status)) {
      case 0:
        return "active";

      case 1:
        return "passive";

      default:
        return "running";
    }
  };
  return (
    <Button loading={loading}>
      <div className="flex gap-2">
        <span>{title}</span>
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold">{getStatus()}</span>
          <Badge status="processing" />
        </div>
      </div>
    </Button>
  );
};

export default ServiceInfoButton;
