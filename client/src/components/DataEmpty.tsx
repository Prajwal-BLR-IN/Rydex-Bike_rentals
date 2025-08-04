const DataEmpty = ({ title, para }: { title: string; para: string }) => {
  return (
    <div className="text-center my-10 mx-auto">
      <h2 className="text-gray-600">{title}</h2>
      <p className="text-gray-500 text-sm">{para}</p>
    </div>
  );
};

export default DataEmpty;
