import { Button, Layout, theme } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import MainFooter from "../components/Footer/Footer";
import MenuItem from "../components/Menu/MenuItem";
import { useAuth } from "../context/AuthContext";
import { encryptStorage } from "../utils/storage";
const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { setUser } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical flex items-center justify-center flex-wrap gap-2 px-3 py-5">
          <img src={logo} alt="logo" className="w-8" />
          <h1 className="text-white text-[17px] font-bold">SYS manage</h1>
        </div>
        <MenuItem />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex justify-end items-center"
        >
          <Button
            className="mr-5"
            onClick={() => {
              setUser(false);
              encryptStorage.clear();
            }}
          >
            Çıxış
          </Button>
        </Header>
        <Content
          style={{
            margin: "20px 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <MainFooter />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
