import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

import { TbReportSearch } from "react-icons/tb";
import { IoDocumentLockOutline } from "react-icons/io5";
import { IoIosCash, IoMdArchive } from "react-icons/io";
import { GoDatabase } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import { useSite } from "../../context/SiteContext";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", 31, <MdDashboard size={"1.3rem"} />),
  getItem("Sifarişlər", 1, <IoDocumentLockOutline size={"1.3rem"} />, [
    getItem("Siyahı", 2),
    getItem("LOGO", 22),
  ]),
  getItem("Ödənişlər", 3, <IoIosCash size={"1.2rem"} />, [
    getItem("Siyahı", 4),
    getItem("Kassa qalıq", 17),
  ]),
  getItem("Mobim", 23, <GoDatabase size={"1.2rem"} />, [
    getItem("Cihazlar", 24),
    getItem("Connections", 25),
  ]),
  getItem("Yeni müştəri", 5, <ImProfile size={"1.2rem"} />, [
    getItem("Müştəri kateqoriyası", 8),
    getItem("Endirimlər", 9),
    getItem("Kampaniyalar", 10),
    getItem("Təslimatçılar", 11),
    getItem("Vizit günləri", 12),
    getItem("İstifadəçilər", 13),
    getItem("Toplu müştəri", 14),
    getItem("Loglar", 16),
  ]),
  getItem("Arxiv", 18, <IoMdArchive size={"1.2rem"} />, [
    getItem("İstifadəçilər", 19),
    getItem("Log", 34),
  ]),

  getItem("Hesabatlar", 28, <TbReportSearch size={"1.2rem"} />, [
    getItem("Düzəliş aktı", 29),
  ]),
  getItem("Administration", 20, <MdOutlineSettings size={"1.2rem"} />, [
    getItem("İstifadəçilər", 21),
    getItem("Regionlar", 32),
    getItem("Brendlər", 33),
    getItem("Status kodları", 30),
    getItem("Orderkind kodları", 35),
  ]),
  //   getItem("Files", "9", <FileOutlined />),
];

const MenuItem = () => {
  const navigate = useNavigate();
  const { menuId, setMenuId } = useSite();

  function handleMenu(event) {
    switch (parseInt(event.key)) {
      case 2:
        navigate("orders/list");
        selectedToLocal(2, "orders/list");
        break;
      case 4:
        navigate("payments/list");
        selectedToLocal(4, "payments/list");
        break;
      case 17:
        navigate("payments/remain");
        selectedToLocal(17, "payments/remain");
        break;
      case 6:
        navigate("client/regions");
        selectedToLocal(6, "client/regions");
        break;
      case 7:
        navigate("client/brands");
        selectedToLocal(7, "client/brands");
        break;
      case 8:
        navigate("client/category");
        selectedToLocal(8, "client/category");
        break;
      case 9:
        navigate("client/discounts");
        selectedToLocal(9, "client/discounts");
        break;
      case 10:
        navigate("client/campaigns");
        selectedToLocal(10, "client/campaigns");
        break;
      case 11:
        navigate("client/delivery");
        selectedToLocal(11, "client/delivery");
        break;
      case 12:
        navigate("client/visits");
        selectedToLocal(12, "client/visits");
        break;
      case 13:
        navigate("client/users");
        selectedToLocal(13, "client/users");
        break;
      case 14:
        navigate("client/bulk");
        selectedToLocal(14, "client/bulk");
        break;
      case 16:
        navigate("client/logs");
        selectedToLocal(16, "client/logs");
        break;
      case 21:
        navigate("setting/users");
        selectedToLocal(21, "setting/users");
        break;
      case 30:
        navigate("setting/status");
        selectedToLocal(30, "setting/status");
        break;
      case 35:
        navigate("setting/status/orderkind");
        selectedToLocal(35, "setting/status/orderkind");
        break;
      case 32:
        navigate("setting/regions");
        selectedToLocal(32, "setting/regions");
        break;
      case 33:
        navigate("setting/brands");
        selectedToLocal(33, "setting/brands");
        break;
      case 22:
        navigate("logo/orders");
        selectedToLocal(22, "logo/orders");
        break;
      case 19:
        navigate("archive/users");
        selectedToLocal(19, "archive/users");
        break;
      case 34:
        navigate("archive/logs");
        selectedToLocal(34, "archive/logs");
        break;
      case 24:
        navigate("mobim/devices");
        selectedToLocal(24, "mobim/devices");
        break;
      case 25:
        navigate("mobim/connections");
        selectedToLocal(25, "mobim/connections");
        break;

      case 29:
        navigate("report/retrification");
        selectedToLocal(29, "report/retrification");
        break;
      case 31:
        navigate("dashboard");
        selectedToLocal(31, "dashboard");
        break;

      default:
        break;
    }
  }

  function selectedToLocal(id, path) {
    localStorage.setItem("navItem", JSON.stringify({ id, path }));
    setMenuId(id);
  }
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[menuId.toString()]}
      selectedKeys={[menuId.toString()]}
      mode="inline"
      onClick={handleMenu}
      items={items}
    />
  );
};

export default MenuItem;
