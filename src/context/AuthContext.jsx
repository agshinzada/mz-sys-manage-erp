import { createContext, useState, useContext } from "react";
import { encryptStorage } from "../utils/storage";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(encryptStorage.getItem("user"));
  const [tokenStatus, setTokenStatus] = useState(
    encryptStorage.getItem("tokenStatus")
  );

  const data = {
    user,
    setUser,
    tokenStatus,
    setTokenStatus,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useAuth = () => useContext(Context);
