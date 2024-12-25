import { createContext, useState, useContext, useEffect } from "react";
import { fetchSysRegions } from "../services/sys_service";
import { useAuth } from "./AuthContext";

const Context = createContext();

export const SiteProvider = ({ children }) => {
  const [regions, setRegions] = useState([]);
  const [menuId, setMenuId] = useState(
    JSON.parse(localStorage.getItem("navItem"))?.id || 31
  );
  const { user } = useAuth();

  async function getRegions() {
    const data = await fetchSysRegions(user.token);
    setRegions(data);
  }

  const data = {
    regions,
    menuId,
    setMenuId,
  };

  useEffect(() => {
    getRegions();
  }, []);

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useSite = () => useContext(Context);
