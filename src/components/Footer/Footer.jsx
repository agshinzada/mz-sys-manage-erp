import { Footer } from "antd/es/layout/layout";
import powered from "../../assets/powered.svg";
import pack from "../../../package.json";

function MainFooter(props) {
  return (
    <Footer
      style={{
        textAlign: "center",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      {...props}
    >
      <p className="text-[13px]">
        Mazarina Trade Company ©{new Date().getFullYear()} V{pack.version}
      </p>
      <a href="https://agshin.dev/">
        <img src={powered} alt="logo" style={{ width: "80px" }} />
      </a>
    </Footer>
  );
}

export default MainFooter;
