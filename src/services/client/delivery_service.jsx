import { notification } from "antd";
import axios from "axios";

export async function fetchDelivery(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/clients/delivery?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchDeliveryByParam(value, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/clients/delivery/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchUpdateDelivery(data, id, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/clients/delivery/${id}?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPostDelivery(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/clients/delivery?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
