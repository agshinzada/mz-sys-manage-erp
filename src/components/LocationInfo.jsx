import { useEffect, useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
const LocationInfo = ({ loading, data }) => {
  const mapRef = useRef(null);
  const lat = data?.INCHARGE2?.trim();
  const long = data?.INCHARGE3?.trim();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([lat, long], 13);
    }
  }, [long, lat]);

  return (
    <div className={`${loading ? "blur-xs" : ""}`}>
      <div className="p-4">
        <div className="flex justify-between">
          <h4 className="font-semibold text-lg mb-2">Koordinatlar</h4>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded-sm flex gap-1 items-center h-fit">
            <FaLocationDot /> {data?.CITY}, {data?.TOWN}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-sm flex gap-1 items-center">
            <FaLocationCrosshairs /> LAT: {data?.INCHARGE2}
          </span>
          <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-sm flex gap-1 items-center">
            <FaLocationCrosshairs /> LONG: {data?.INCHARGE3}
          </span>
        </div>
        <p className="flex gap-2 items-center text-xs text-blue-500 mt-3">
          {lat && long ? (
            <>
              <a
                href={`https://maps.google.com/?q=${lat},${long}`}
                target="_blank"
                className="flex items-center gap-1"
              >
                <FaExternalLinkAlt /> Google Map
              </a>
              <a
                href={`https://www.waze.com/live-map/directions?to=ll.${lat}%2C${long}`}
                target="_blank"
                className="flex items-center gap-1"
              >
                <FaExternalLinkAlt /> Waze
              </a>
            </>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="w-full h-[400px]">
        {lat && long ? (
          <MapContainer
            center={[lat, long]}
            zoom={15}
            scrollWheelZoom={false}
            className="w-full h-[400px]"
            ref={mapRef}
          >
            <TileLayer
              attribution=""
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, long]}></Marker>
          </MapContainer>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-red-400 flex gap-1 items-center text-lg">
              <MdError className="text-2xl" />
              LOKASİYA MÖVCUD DEYİL!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationInfo;
