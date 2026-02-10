export default function StatCard({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold text-yellow-400 mt-2">{value}</p>
    </div>
  )
}
