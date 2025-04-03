const ClientInfoItem = ({ title, data }) => {
  return (
    <div className="flex items-center gap-1 justify-between border border-slate-200 rounded-md p-2.5">
      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-sm flex gap-1 items-center w-fit">
        {title}
      </span>
      <p>{data}</p>
    </div>
  );
};

export default ClientInfoItem;
