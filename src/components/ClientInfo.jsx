import { IoIosPerson } from "react-icons/io";
import { MdBlock, MdOutlineDownloadDone } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import ClientInfoItem from "./ClientInfoItem";

const ClientInfo = ({ loading, data }) => {
  return (
    <div className={`${loading ? "blur-xs" : ""}`}>
      <p className="font-bold px-5 py-2 rounded-sm bg-blue-100 shadow-sm w-fit xl:hidden mb-4">
        {data?.CODE}
      </p>
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold mb-2 text-lg">Müştəri məlumatları</h4>
          <div className="flex gap-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-sm flex gap-1 items-center">
              <IoIosPerson />
              {data?.SPECODE}
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-sm flex gap-1 items-center">
              <FaTruck /> {data?.DELIVERYMETHOD}
            </span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-sm flex gap-1 items-center">
              {data?.ACTIVE === 0 ? (
                <>
                  <MdOutlineDownloadDone /> Aktiv
                </>
              ) : (
                <>
                  <BiErrorCircle /> Passiv
                </>
              )}
            </span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-sm flex gap-1 items-center">
              <MdBlock />{" "}
              {data?.TAXOFFCODE === "RISK" ? "Blokdadır" : "Blokda deyil"}
            </span>
          </div>
        </div>
        <p className="font-bold  px-5 py-2 rounded-sm bg-blue-100 shadow-sm hidden xl:block">
          {data?.CODE}
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <ClientInfoItem title="AD:" data={data?.DEFINITION_} />
          <ClientInfoItem title="ÜNVAN:" data={data?.ADDR1} />
          <ClientInfoItem title="KATEQORİYA:" data={data?.TRADINGGRP} />
          <ClientInfoItem title="VÖEN:" data={data?.TAXNR} />
          <ClientInfoItem title="GÜN LİMİTİ:" data={data?.DBSLIMIT2} />
          <ClientInfoItem
            title="MÜQAVİLƏ ÜZRƏ GÜN LİMİTİ:"
            data={data?.POSTCODE}
          />
        </div>
        <div className="">
          <h4 className="font-semibold my-5 text-lg">Əlaqə məlumatları</h4>
          <div className="flex flex-col gap-3">
            <ClientInfoItem title="ƏLAQƏDAR ŞƏXS:" data={data?.FAXNR} />
            <ClientInfoItem
              title="ƏLAQƏ NÖMRƏSİ:"
              data={`${data?.TELNRS1} / ${data?.TELNRS2}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
