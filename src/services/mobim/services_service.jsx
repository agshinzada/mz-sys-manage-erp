import { notification } from "antd";
import axios from "axios";

export async function fetchServices(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/mobim/services?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
export async function fetchServiceTasks(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/mobim/services/tasks?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchServiceTasksByParam(value, token) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/mobim/services/tasks/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchOpenAllTasks(token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/mobim/services/tasks/open?token=${token}`
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchBulkTaskStatus(arr, token) {
  try {
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/mobim/services/tasks/status/bulk?token=${token}`,
      arr
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPutServiceStatus(id, token) {
  try {
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/mobim/services/status/${id}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPutTaskStatus(id, token) {
  try {
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/mobim/services/tasks/status/${id}?token=${token}`
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPutService(params, id, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/mobim/services/${id}?token=${token}`,
      params
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
