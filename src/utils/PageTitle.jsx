const PageTitle = ({ title }) => {
  return (
    <h3 className="text-slate-700 pb-5 font-semibold text-[17px]">
      {title?.toLocaleUpperCase("az")}
    </h3>
  );
};

export default PageTitle;
