import { EditDelete } from './EditDelete'

export default function SingleProduct({imageUrl, id}) {
  return (
    <div
      className="relative group shadow-lg shadow-neutral-950 transition-transform duration-300 rounded-2xl max-w-70 max-h-160  cursor-pointer"
    >
      <div className="max-w-full h-65 rounded-2xl bg-gray-950 overflow-hidden">
        <img
          src={imageUrl}
          alt="food"
          className="object-contain w-full h-full"
        />
      </div>
      <div className="absolute inset-0 rounded-2xl bg-zinc-500/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <EditDelete id={id} />
      </div>
    </div>
  )
}
