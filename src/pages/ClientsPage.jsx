import { useEffect, useState } from "react";
import SearchForm from "../utils/SearchForm";
import { Button, Spin } from "antd";
import { IoIosPerson } from "react-icons/io";
import { FaTruck } from "react-icons/fa";
import { MdBlock, MdOutlineDownloadDone } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import PageTitle from "../utils/PageTitle";
import { fetchClientsBySearch } from "../services/sys_service";
import { useAuth } from "../context/AuthContext";
import { Link, useSearchParams } from "react-router-dom";

const ClientsPage = () => {
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState([]);
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  async function getData(value) {
    setLoading(true);
    const data = await fetchClientsBySearch(value, user.TOKEN);
    setClientData(data);
    setLoading(false);
  }

  function handleSearch(params) {
    setSearchParams({ axtar: params.value });
  }

  useEffect(() => {
    const searchValue = searchParams.get("axtar") || "";
    if (searchValue) {
      getData(searchValue);
    } else {
      setClientData([]);
    }
  }, [searchParams]);

  return (
    <div>
      <PageTitle title="Müştəri axtarışı" />
      <SearchForm onFinish={handleSearch} placeholder="Müştəri kodu və ya ad" />
      <Spin spinning={loading}>
        <div className="flex w-full flex-col gap-3">
          {clientData.map((item) => (
            <div
              className="flex items-center gap-1 justify-between border border-slate-200 rounded-md p-2.5 w-full"
              key={item.LOGICALREF}
            >
              <p className="flex items-center gap-1">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-sm flex gap-1 items-center w-fit">
                  {item?.CODE}
                </span>
                - {item?.DEFINITION_}
              </p>

              <div className="flex gap-4">
                <div className="flex gap-1 items-center">
                  <IoIosPerson />
                  {item?.SPECODE}
                </div>
                <div className="flex gap-1 items-center">
                  <FaTruck />
                  {item?.DELIVERYMETHOD}
                </div>
                <div className="flex gap-1 items-center">
                  {item?.ACTIVE === 0 ? (
                    <>
                      <MdOutlineDownloadDone /> Aktiv
                    </>
                  ) : (
                    <>
                      <BiErrorCircle /> Passiv
                    </>
                  )}
                </div>
                <div className="flex gap-1 items-center">
                  <MdBlock />
                  {item?.TAXOFFCODE === "RISK" ? "Blokdadır" : "Blokda deyil"}
                </div>
                <Link to={`/clients/detail/${item.LOGICALREF}`}>
                  <Button
                    size="small"
                    type="primary"
                    className="mr-2"
                    // icon={<BsPencilSquare />}
                  >
                    Ətraflı
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default ClientsPage;
