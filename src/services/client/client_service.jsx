import { notification } from "antd";
import axios from "axios";

export async function fetchCreateClientCodesBulk(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/clients/codes/createcode?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchCheckBulkClientCodes(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/clients/codes/check?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchUploadBulkClients(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/clients/codes/bulk?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchUploadBulkStickers(data, token) {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_API_URL
      }/clients/codes/bulk/sticker?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchGenerateStickerLow1Codes(data, token) {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_API_URL
      }/clients/codes/createsticker?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchRoutes(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/clients/codes/routes?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
