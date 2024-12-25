import { notification } from "antd";
import axios from "axios";

export async function fetchConnections(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/mobim/connections?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchConnectionsByParam(value, token) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/mobim/connections/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPutConnection(data, id, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/mobim/connections/${id}?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPostNewConnection(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/mobim/connections?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchDeleteConnection(id, token) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/mobim/connections/${id}?token=${token}`
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
