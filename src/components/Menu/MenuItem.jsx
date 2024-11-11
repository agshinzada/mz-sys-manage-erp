import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  SnippetsOutlined,
  DollarOutlined,
  PlusSquareOutlined,
  BarcodeOutlined,
  SettingOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { TbReportSearch } from "react-icons/tb";
import { IoDocumentLockOutline } from "react-icons/io5";
import { IoIosCash, IoMdArchive } from "react-icons/io";
import { FaDatabase } from "react-icons/fa";
import { GoDatabase } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { MdOutlineSettings } from "react-icons/md";

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
    getItem("Servislər", 26),
  ]),
  getItem("Yeni müştəri", 5, <ImProfile size={"1.2rem"} />, [
    getItem("Regionlar", 6),
    getItem("Brendlər", 7),
    getItem("Müştəri kateqoriyası", 8),
    getItem("Endirimlər", 9),
    getItem("Kampaniyalar", 10),
    getItem("Təslimatçılar", 11),
    getItem("Vizit günləri", 12),
    getItem("İstifadəçilər", 13),
    getItem("Toplu müştəri", 14),
    getItem("Məhsul düzəlişi", 15),
    getItem("Loglar", 16),
  ]),
  getItem("Archive", 18, <IoMdArchive size={"1.2rem"} />, [
    getItem("İstifadəçilər", 19),
  ]),

  getItem("Hesabatlar", 28, <TbReportSearch size={"1.2rem"} />, [
    getItem("Düzəliş aktı", 29),
  ]),
  getItem("Administration", 20, <MdOutlineSettings size={"1.2rem"} />, [
    getItem("İstifadəçilər", 21),
    getItem("Status kodları", 30),
    getItem("APP versiyalar", 27),
  ]),
  //   getItem("Files", "9", <FileOutlined />),
];

const MenuItem = () => {
  const navigate = useNavigate();

  function handleMenu(event) {
    switch (parseInt(event.key)) {
      case 2:
        navigate("orders/list");
        selectedToLocal(2);
        break;
      case 4:
        navigate("payments/list");
        selectedToLocal(4);
        break;
      case 17:
        navigate("payments/remain");
        selectedToLocal(17);
        break;
      case 6:
        navigate("client/regions");
        selectedToLocal(6);
        break;
      case 7:
        navigate("client/brands");
        selectedToLocal(7);
        break;
      case 8:
        navigate("client/category");
        selectedToLocal(8);
        break;
      case 9:
        navigate("client/discounts");
        selectedToLocal(9);
        break;
      case 10:
        navigate("client/campaigns");
        selectedToLocal(10);
        break;
      case 11:
        navigate("client/delivery");
        selectedToLocal(11);
        break;
      case 12:
        navigate("client/visits");
        selectedToLocal(12);
        break;
      case 13:
        navigate("client/users");
        selectedToLocal(13);
        break;
      case 14:
        navigate("client/bulk");
        selectedToLocal(14);
        break;
      case 16:
        navigate("client/logs");
        selectedToLocal(16);
        break;
      case 21:
        navigate("setting/users");
        selectedToLocal(21);
        break;
      case 27:
        navigate("setting/app/versions");
        selectedToLocal(27);
        break;
      case 30:
        navigate("setting/status");
        selectedToLocal(30);
        break;
      case 22:
        navigate("logo/orders");
        selectedToLocal(22);
        break;
      case 19:
        navigate("archive/users");
        selectedToLocal(19);
        break;
      case 24:
        navigate("mobim/devices");
        selectedToLocal(24);
        break;
      case 25:
        navigate("mobim/connections");
        selectedToLocal(25);
        break;
      case 26:
        navigate("mobim/services");
        selectedToLocal(26);
        break;
      case 29:
        navigate("report/retrification");
        selectedToLocal(29);
        break;

      default:
        break;
    }
  }

  function selectedToLocal(id) {
    localStorage.setItem("navId", id);
  }
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[localStorage.getItem("navId") || 2]}
      mode="inline"
      onClick={handleMenu}
      items={items}
    />
  );
};

export default MenuItem;
