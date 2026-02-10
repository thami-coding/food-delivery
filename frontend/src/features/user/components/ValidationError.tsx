export default function ValidationError({ error }) {
  const keys = Object.keys(error?.fields ?? {})

  return (
    <p className="text-red-400 mt-4 transition-all duration-300 ease-in-out opacity-100">
      {error?.fields[keys[0]]}
    </p>
  )
}
