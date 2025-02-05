import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../utils/PageTitle";
import {
  fetchServices,
  fetchServiceTasks,
} from "../../services/mobim/services_service";
import ServiceInfoButton from "../../utils/ServiceInfoButton";
import { Button, List, Tag } from "antd";
import {
  MdDisabledByDefault,
  MdOutlineRunningWithErrors,
} from "react-icons/md";
import { RiRestTimeLine } from "react-icons/ri";
import { fetchDelayedOrders } from "../../services/order_service";
import formatDateTime from "../../utils/usableFunc";
import { fetchDeviceById } from "../../services/device_service";
import DeviceDetailModal from "../../components/Modal/DeviceDetailModal";
import { fetchDelayedPayments } from "../../services/payment_service";
import { fetchLogoOrdersByFilter } from "../../services/logo_service";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSite } from "../../context/SiteContext";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { setMenuId } = useSite();
  const [dataSource, setDataSource] = useState([]);
  const [passiveTasks, setPassiveTasks] = useState([]);
  const [services, setServices] = useState([]);

  const [delayedOrders, setDelayedOrders] = useState([]);
  const [delayedPayments, setDelayedPayments] = useState([]);
  const [errorWhOrders, setErrorWhOrders] = useState([]);
  const [errorCngOrders, setErrorCngOrders] = useState([]);

  const [isOpenDevice, setIsOpenDevice] = useState(false);
  const [deviceModalLoading, setDeviceModalLoading] = useState(true);
  const [deviceData, setDeviceData] = useState([]);

  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  async function getServices() {
    setLoading(true);
    const data = await fetchServices(user.TOKEN);
    setServices(data);
    setLoading(false);
  }

  async function getDelayedOrders() {
    setLoading(true);
    const data = await fetchDelayedOrders(user.TOKEN);
    setDelayedOrders(data?.slice(0, 4));
    setLoading(false);
  }
  async function getErrorOrders() {
    setLoading(true);
    const data = await fetchLogoOrdersByFilter(
      {
        from: new Date().toLocaleDateString("az"),
        to: new Date().toLocaleDateString("az"),
        status: "ERR_WH",
      },
      user.TOKEN
    );
    const data1 = await fetchLogoOrdersByFilter(
      {
        from: new Date().toLocaleDateString("az"),
        to: new Date().toLocaleDateString("az"),
        status: "ERR_CNG",
      },
      user.TOKEN
    );
    setErrorWhOrders(data);
    setErrorCngOrders(data1);
    setLoading(false);
  }

  async function getDelayedPayments() {
    setLoading(true);
    const data = await fetchDelayedPayments(user.TOKEN);
    setDelayedPayments(data?.slice(0, 4));
    setLoading(false);
  }

  async function getData() {
    setLoading(true);
    const data = await fetchServiceTasks(user.TOKEN);
    setDataSource(data.filter((item) => item.active === 2));
    setPassiveTasks(
      data.filter((item) => {
        return (
          (item.task1 === 1 || item.task2 === 1 || item.task3 === 1) &&
          item.REGION_NAME === "BAKU"
        );
      })
    );
    setLoading(false);
  }

  async function openDeviceModal(record) {
    setDeviceModalLoading(true);
    setIsOpenDevice(true);
    const data = await fetchDeviceById(record, user.TOKEN);
    setDeviceData(data);
    setDeviceModalLoading(false);
  }

  useEffect(() => {
    getServices();
    getData();
    getDelayedOrders();
    getDelayedPayments();
    getErrorOrders();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title={"dashboard"} />
        <Button
          type="primary"
          onClick={() => {
            getData();
            getServices();
            getDelayedOrders();
            getDelayedPayments();
            getErrorOrders();
          }}
          loading={loading}
        >
          Yenilə
        </Button>
      </div>
      <div>
        <div className="flex gap-3 sm:justify-center my-6 flex-wrap">
          {services?.map((item) => (
            <ServiceInfoButton
              title={item.name}
              status={item.active}
              key={item.id}
              data={item}
              loading={loading}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 flex-col lg:flex-row">
            <List
              header={
                <div>
                  Running tasks - <Tag color="gray">{dataSource?.length}</Tag>
                </div>
              }
              className="w-full"
              bordered
              loading={loading}
              dataSource={dataSource}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <div className="flex gap-4 items-center">
                    <MdOutlineRunningWithErrors size={"1.6rem"} />
                    <div>
                      <p>{item?.BRAND_NAME}</p>
                      <p className="text-gray-500 text-xs">
                        {item?.REGION_NAME}
                      </p>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <List
              header={
                <div>
                  Passive tasks - <Tag color="gray">{passiveTasks?.length}</Tag>
                </div>
              }
              bordered
              loading={loading}
              className="w-full"
              dataSource={passiveTasks}
              renderItem={(item, index) => (
                <List.Item className="w-full" key={index}>
                  <div className="flex gap-4 items-center w-full border border-slate-300 p-4 sm:border-none sm:p-0 rounded-lg">
                    <div className="flex items-center gap-1 flex-col sm:flex-row sm:justify-between w-full">
                      <div className="flex items-center gap-2 w-full">
                        <MdDisabledByDefault size={"1.6rem"} />
                        <div>
                          <p>{item?.BRAND_NAME}</p>
                          <p className="text-gray-500 text-xs">
                            {item?.REGION_NAME}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <p className="text-xs">
                          Satış:{" "}
                          <span className="font-bold">
                            {item?.task1 === 1 ? "passive" : "active"}
                          </span>
                        </p>
                        <p className="text-xs">
                          Kassa:{" "}
                          <span className="font-bold">
                            {item?.task2 === 1 ? "passive" : "active"}
                          </span>
                        </p>
                        <p className="text-xs">
                          Anbar:{" "}
                          <span className="font-bold">
                            {item?.task3 === 1 ? "passive" : "active"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
          <div className="flex gap-4 flex-col lg:flex-row">
            <List
              header={
                <div>
                  Delayed Orders -{" "}
                  <Tag color="gray">{delayedOrders?.length}</Tag>
                </div>
              }
              className="w-full"
              bordered
              loading={loading}
              dataSource={delayedOrders}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <div className="flex gap-4 items-center">
                    <RiRestTimeLine size={"1.6rem"} />
                    <div className="flex flex-col gap-1">
                      <p>
                        Device:
                        <Button
                          type="link"
                          onClick={() => openDeviceModal(item?.device_id)}
                        >
                          {item?.device_id}
                        </Button>
                      </p>
                      <p className="text-gray-500 text-xs">
                        Order: {item?.order_id}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Date: {formatDateTime(item?.InsertedDate, -4)}
                      </p>
                      <p className="text-gray-500 text-xs flex gap-1">
                        <Tag color="blue">{item?.ORDERKIND_NAME}</Tag>
                        <Tag color="blue">{item?.BRAND_NAME}</Tag>
                        <Tag color="blue">{item?.SPECODE}</Tag>
                      </p>
                    </div>
                  </div>
                </List.Item>
              )}
            >
              {delayedOrders?.length ? (
                <div className="flex justify-end p-2">
                  <Button
                    type="primary"
                    size="small"
                    icon={<FiExternalLink />}
                    onClick={() => {
                      localStorage.setItem("navId", 2);
                      setMenuId(2);
                      navigate("/orders/list");
                    }}
                  >
                    More
                  </Button>
                </div>
              ) : (
                ""
              )}
            </List>
            <List
              header={
                <div>
                  Delayed Payments -{" "}
                  <Tag color="gray">{delayedPayments?.length}</Tag>
                </div>
              }
              className="w-full"
              bordered
              loading={loading}
              dataSource={delayedPayments}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <div className="flex gap-4 items-center">
                    <RiRestTimeLine size={"1.6rem"} />
                    <div className="flex flex-col gap-1">
                      <p>
                        Device:
                        <Button
                          type="link"
                          onClick={() => openDeviceModal(item?.device_id)}
                        >
                          {item?.device_id}
                        </Button>
                      </p>
                      <p className="text-gray-500 text-xs">
                        Order: {item?.payment_id}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Date: {formatDateTime(item?.InsertedDate, -4)}
                      </p>
                      <p className="text-gray-500 text-xs flex gap-1">
                        <Tag color="blue">{item?.BRAND_NAME}</Tag>
                        <Tag color="blue">{item?.amount}</Tag>
                        <Tag color="blue">{item?.SPECODE}</Tag>
                      </p>
                    </div>
                  </div>
                </List.Item>
              )}
            >
              {delayedPayments?.length ? (
                <div className="flex justify-end p-2 items-end">
                  <Button
                    type="primary"
                    size="small"
                    icon={<FiExternalLink />}
                    onClick={() => {
                      localStorage.setItem("navId", 4);
                      setMenuId(4);
                      navigate("/payments/list");
                    }}
                  >
                    More
                  </Button>
                </div>
              ) : (
                ""
              )}
            </List>
          </div>
          <div className="flex gap-4 flex-col lg:flex-row">
            <List
              header={
                <div>
                  Orders - <span className="font-bold">ERR_WH</span>{" "}
                  <Tag color="gray">{errorWhOrders?.length}</Tag>
                </div>
              }
              className="w-full"
              bordered
              loading={loading}
              dataSource={errorWhOrders}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <div className="flex gap-4 items-center">
                    <RiRestTimeLine size={"1.6rem"} />
                    <div className="flex flex-col gap-1">
                      <p>Code: {item?.CODE}</p>
                      <p className="text-gray-500 text-xs">
                        Name: {item?.DEFINITION_}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Route: {item?.RUT}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Delivery: {item?.DELIVERY}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Total: {item?.NETTOTAL}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Date: {new Date(item?.DATE_).toLocaleDateString("az")}
                      </p>
                    </div>
                  </div>
                </List.Item>
              )}
            />

            <List
              header={
                <div>
                  Orders - <span className="font-bold">ERR_CNG</span>{" "}
                  <Tag color="gray">{errorCngOrders?.length}</Tag>
                </div>
              }
              className="w-full"
              bordered
              loading={loading}
              dataSource={errorCngOrders}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <div className="flex gap-4 items-center">
                    <RiRestTimeLine size={"1.6rem"} />
                    <div className="flex flex-col gap-1">
                      <p>Code: {item?.CODE}</p>
                      <p className="text-gray-500 text-xs">
                        Name: {item?.DEFINITION_}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Route: {item?.RUT}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Delivery: {item?.DELIVERY}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Total: {item?.NETTOTAL}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Date: {new Date(item?.DATE_).toLocaleDateString("az")}
                      </p>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
      <DeviceDetailModal
        isOpen={isOpenDevice}
        setIsOpen={setIsOpenDevice}
        setLoading={setDeviceModalLoading}
        loading={deviceModalLoading}
        data={deviceData}
      />
    </div>
  );
};

export default DashboardPage;
