const AdminPage = () => {
 return (
  <div className="max-w-4xl  ml-80">
   <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <StatCard title="Total Orders" value="124" />
    <StatCard title="Pending Orders" value="18" />
    <StatCard title="Products" value="42" />
   </div>
  </div>
 );
};

const StatCard = ({ title, value }: { title: string; value: string }) => (
 <div className="bg-[#1a1a1a] rounded-xl p-6">
  <p className="text-gray-400 text-sm">{title}</p>
  <p className="text-3xl font-bold text-[#ffb900] mt-2">{value}</p>
 </div>
);

export default AdminPage;