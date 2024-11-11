import { notification } from "antd";
import axios from "axios";

export async function fetchCampaign(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/clients/campaigns?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchCampaignByParam(value, token) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/clients/campaigns/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchUpdateCampaign(data, id, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/clients/campaigns/${id}?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPostCampaign(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/clients/campaigns?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
