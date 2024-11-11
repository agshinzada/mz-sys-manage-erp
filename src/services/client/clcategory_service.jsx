import { notification } from "antd";
import axios from "axios";

export async function fetchClientCategory(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/clients/category?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchClientCategoryByParam(value, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/clients/category/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchUpdateClientCategory(data, id, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/clients/category/${id}?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPostClientCategory(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/clients/category?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
