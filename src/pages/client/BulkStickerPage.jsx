import { Button, Form, Spin } from "antd";
import PageTitle from "../../utils/PageTitle";
import TextArea from "antd/es/input/TextArea";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import {
  fetchGenerateStickerLow1Codes,
  fetchUploadBulkStickers,
} from "../../services/client/client_service";

const BulkStickerPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [processingMessage, setProcessingMessage] = useState("");

  async function uploadData(data) {
    setLoading(true);
    setProcessingMessage("Kodlar yaradılır...");
    const uniqueArray = [...new Set(data.stickers.split("\n"))];
    const nonBlankLines = uniqueArray.filter((line) => line.trim() !== "");
    const codes = await fetchGenerateStickerLow1Codes(
      nonBlankLines,
      user.TOKEN
    );
    console.log("codes", codes);
    console.log("nonBlankLines", nonBlankLines);
    setProcessingMessage("Sistemə yüklənir...");
    // await fetchUploadBulkStickers(
    //   {
    //     data: nonBlankLines,
    //     userRef: user.REF,
    //   },
    //   user.TOKEN
    // );
    setLoading(false);
    setProcessingMessage("");
  }

  return (
    <div>
      <PageTitle title={"toplu stiker"} />
      <Spin spinning={loading} tip={processingMessage}>
        <Form layout="vertical" onFinish={uploadData} autoComplete="off">
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
            <Form.Item className="flex justify-end">
              <Button type="primary" htmlType="submit" loading={loading}>
                Sistemə yüklə
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default BulkStickerPage;
