import { notification } from "antd";
import axios from "axios";

export async function fetchArchiveUsers(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/archive/users?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchArchiveUsersByParam(value, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/archive/users/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchUpdateArchiveUser(data, id, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/archive/users/${id}?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPostArchiveUser(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/archive/users?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchUpdateArchiveUserPassword(data, id, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/archive/users/pass/${id}?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
