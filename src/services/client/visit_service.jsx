import { notification } from "antd";
import axios from "axios";

export async function fetchVisitDay(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/clients/visits?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchVisitDayByParam(value, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/clients/visits/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
