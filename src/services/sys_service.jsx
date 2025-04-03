import { notification } from "antd";
import axios from "axios";

export async function fetchSysStatusCodes(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/sys/status?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchSysStatusCodesByParam(value, token) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/sys/status/search?q=${value}&token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchNewStatus(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/sys/status?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
export async function fetchPutSysStatus(id, data, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/sys/status/${id}?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
export async function fetchSysOrderkindCodes(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/sys/status/orderkind?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchSysOrderkindCodesByParam(value, token) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/sys/status/orderkind/search?q=${value}&token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchNewOrderkind(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/sys/status/orderkind?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
export async function fetchPutSysOrderkind(id, data, token) {
  try {
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/sys/status/orderkind/${id}?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchAppVersions(type, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/sys/apps/${type}?token=${token}`
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
export async function fetchSysBrands(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/sys/brands?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchClientsBySearch(value, token) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/sys/clients/search/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchClientById(value, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/sys/clients/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchSysBrandsByParam(value, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/sys/brands/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchUpdateSysBrand(data, id, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/sys/brands/${id}?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPostSysBrand(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/sys/brands?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchSysRegions(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/sys/regions?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchUpdateSysRegion(data, id, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/sys/regions/${id}?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPostSysRegion(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/sys/regions?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
