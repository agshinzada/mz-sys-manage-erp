import { SnippetsOutlined, DollarOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import MainFooter from "../components/Footer/Footer";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  //   getItem("Dashboard", "2", <DesktopOutlined />),
  getItem("Orders", 1, <SnippetsOutlined />, [
    getItem("List", "3"),
    // getItem("Bill", "4"),
    // getItem("Alex", "5"),
  ]),
  getItem("Payments", 2, <DollarOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "7"),
  ]),
  //   getItem("Files", "9", <FileOutlined />),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  function handleMenu(event) {
    switch (parseInt(event.key)) {
      case 3:
        navigate("orders/list");
        break;

      default:
        break;
    }
  }
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
        <div className="demo-logo-vertical flex items-center justify-center gap-2 px-3 py-5">
          <img src={logo} alt="logo" className="w-8" />
          <h1 className="text-white text-[17px] font-bold">SYS manage</h1>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={handleMenu}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex justify-end items-center"
        >
          <Button className="mr-5">Çıxış</Button>
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
