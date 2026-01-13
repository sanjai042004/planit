export const FeatureCard = ({ icon, title, desc, color }) => {
  return (
    <div className="group bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm
      hover:-translate-y-3 hover:shadow-xl transition cursor-pointer cursor-pointer">

      <div className={`w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl ${color}`}>
        {icon}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );
};
