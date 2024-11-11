import { notification } from "antd";
import axios from "axios";

export async function fetchReportRetrification(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/reports/retrification?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
