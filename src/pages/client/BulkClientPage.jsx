import { Button, Form, notification, Select, Spin, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import PageTitle from "../../utils/PageTitle";
import { useAuth } from "../../context/AuthContext";
import {
  fetchCheckBulkClientCodes,
  fetchCreateClientCodesBulk,
  fetchRoutes,
  fetchUploadBulkClients,
} from "../../services/client/client_service";
import { fetchBrands } from "../../services/client/brand_service";
import writeXlsxFile from "write-excel-file";

const BulkClientPage = () => {
  const { user } = useAuth();
  const [brands, setBrands] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [duplTableData, setDuplTableData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [processingMessage, setProcessingMessage] = useState("");

  const columns = [
    {
      title: "Route",
      dataIndex: "ROUTE",
      key: "ROUTE",
    },
    {
      title: "Sticker",
      dataIndex: "STICKER",
      key: "STICKER",
    },
    {
      title: "Kod",
      dataIndex: "CODE",
      key: "CODE",
    },
    {
      title: "Ad",
      dataIndex: "NAME",
      key: "NAME",
    },
  ];

  const schema = [
    {
      column: "Route",
      type: String,
      value: (item) => item.ROUTE,
    },
    {
      column: "Sticker",
      type: String,
      value: (item) => item.STICKER,
    },
    {
      column: "Kod",
      type: String,
      value: (item) => item.CODE,
    },
    {
      column: "Ad",
      type: String,
      value: (item) => item.NAME,
    },
  ];

  async function createCodes(data) {
    setProcessingMessage("Kodlar yaradılır...");
    const uniqueArray = [...new Set(data.stickers.split("\n"))];
    const nonBlankLines = uniqueArray.filter((line) => line.trim() !== "");
    const codes = await fetchCreateClientCodesBulk(
      {
        brandCode: data.brand.value,
        brandId: data.brand.key,
        routeCode: data.route.key,
        stickers: nonBlankLines,
      },
      user.TOKEN
    );
    return codes;
  }

  async function checkClientCodes(data) {
    setProcessingMessage("Sistemdə təkrar kodlar yoxlanır...");
    const codes = [];
    for (const iterator of data) {
      codes.push(iterator.CODE);
    }
    const fetchdata = await fetchCheckBulkClientCodes(
      {
        codes,
      },
      user.TOKEN
    );
    return fetchdata;
  }

  function clearDuplicate(original, dupl) {
    setProcessingMessage("Təkrarlanan kodlar silinir...");
    if (dupl.length > 0) {
      const filter = original.filter((item) => {
        return !dupl.some((secondItem) => secondItem.CODE === item.CODE);
      });
      return filter;
    }
    return original;
  }

  async function getBrands() {
    const data = await fetchBrands(user.TOKEN);
    setBrands(data);
  }

  async function getRoutes() {
    const data = await fetchRoutes(user.TOKEN);
    setRoutes(data);
  }

  async function convertToExcel(data, filename) {
    try {
      if (data.length > 0) {
        await writeXlsxFile(tableData, {
          schema,
          filePath: `/export/${filename}.xlsx`,
          fileName: `${filename}.xlsx`,
        });
      } else {
        notification.error("Məlumat tapılmadı!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadClients(params) {
    try {
      setLoading(true);
      const codes = await createCodes(params);
      const dupl = await checkClientCodes(codes);
      const result = clearDuplicate(codes, dupl);
      setProcessingMessage("Sistemə yüklənir...");
      if (result.length > 0) {
        await fetchUploadBulkClients(
          {
            data: result,
            userRef: user.REF,
          },
          user.TOKEN
        );
      } else {
        notification.warning({
          duration: 0,
          description:
            "Stikerlər üzrə bütün müştəri kodları sistemdə mövcuddur.",
          message: "Müştəri əlavəsi",
        });
      }
      setTableData(result);
      setDuplTableData(dupl);
      console.log("all", codes);
      console.log("dupl", dupl);
      console.log("result", result);
      console.log(params);
      setLoading(false);
    } catch (error) {
      console.log(error);
      notification.error(error.message);
    }
  }

  useEffect(() => {
    getBrands();
    getRoutes();
  }, []);

  return (
    <div>
      <PageTitle title={"toplu müştəri"} />
      <Spin spinning={loading} tip={processingMessage}>
        <Form layout="vertical" onFinish={uploadClients} autoComplete="off">
          <div className="p-4 w-full flex flex-col gap-3">
            <Form.Item
              label="Stiker kodları"
              name="stickers"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <TextArea rows={10} />
            </Form.Item>

            <div className="flex gap-2">
              <Form.Item
                label="Brendlər"
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
                  showSearch
                  labelInValue
                  placeholder="Brendi seç"
                  optionFilterProp="children"
                >
                  {brands.map((option) => (
                    <Option key={option.ID} value={option.TYPE + option.CODE}>
                      {option.NAME}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Rutlar"
                name="route"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Select
                  showSearch
                  labelInValue
                  placeholder="Rutu seç"
                  optionFilterProp="children"
                >
                  {routes.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <Form.Item className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                // onClick={createCodes}
                loading={loading}
              >
                Sistemə yüklə
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Spin>

      <div className="w-full min-h-screen bg-white mt-4 p-4">
        <div>
          <div className="flex justify-between my-5">
            <label className="font-semibold">Müştəri kodları</label>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              className="w-fit"
              onClick={() => convertToExcel(tableData, "bulk-codes")}
            >
              Excel yüklə
            </Button>
          </div>
          <Table
            dataSource={tableData}
            columns={columns}
            loading={loading}
            rowKey={(record) => record.LOGICALREF}
          />
          <div className="flex justify-between mb-5 mt-8">
            <label className="font-semibold">Təkrarlanan kodlar</label>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              className="w-fit"
              onClick={() => convertToExcel(duplTableData, "dupl-codes")}
            >
              Excel yüklə
            </Button>
          </div>
          <Table
            dataSource={duplTableData}
            columns={columns}
            loading={loading}
            rowKey={(record) => record.LOGICALREF}
          />
        </div>
      </div>
    </div>
  );
};

export default BulkClientPage;
