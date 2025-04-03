import { BiErrorCircle } from "react-icons/bi";
import ClientInfo from "../components/ClientInfo";
import LocationInfo from "../components/LocationInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchClientById } from "../services/sys_service";
import { Button, Spin } from "antd";
import { IoArrowBackCircle } from "react-icons/io5";

const ClientDetailViewPage = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const getData = async () => {
    const cdata = await fetchClientById(params.clientId, user.TOKEN);
    setData(cdata);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [params]);

  return (
    <div className="">
      <div
        className="flex gap-1 items-center cursor-pointer w-fit"
        onClick={() => window.history.back()}
      >
        <IoArrowBackCircle className="text-4xl" /> Geri
      </div>

      <Spin spinning={loading}>
        <div className="grid grid-cols-12 gap-5 mt-10 items-stretch w-full">
          {data && data?.CODE ? (
            <>
              <div className="col-span-full lg:col-span-6 border border-slate-200 rounded-lg p-6 bg-white h-full relative ">
                <ClientInfo data={data} loading={loading} />
              </div>
              <div className="col-span-full lg:col-span-6 border border-slate-200 rounded-lg bg-white h-full relative ">
                <LocationInfo data={data} loading={loading} />
              </div>
            </>
          ) : (
            <div className="col-span-full py-20">
              <p className="flex items-center gap-1 text-lg justify-center">
                <BiErrorCircle className="text-xl text-red-500" /> Müştəri
                mövcud deyil
              </p>
            </div>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default ClientDetailViewPage;
