import { useEffect, useRef } from "react"

const options = [
  { label: "Today", dateRange: "today" },
  { label: "Last 30 days", dateRange: "30" },
  { label: "Last 60 days", dateRange: "60" },
  { label: "Last 90 days", dateRange: "90" },
  { label: "All time", dateRange: "all" },
]

export default function DateRangeFilter({
  open,
  setOpen,
  dateRange,
  status,
  setSearchParams
}) {
  const divRef = useRef<HTMLDivElement | null>(null)
  
  const selectedLabel =
    options.find((o) => o.dateRange === dateRange)?.label || "Last 30 days"

  const handleSelect = (dateRange) => {
    setSearchParams({
      dateRange,
      status: dateRange !== "today" ? "done" : "preparing",
    })
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const element = divRef.current
      if (element && !element.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setOpen])

  return (
    <div className="relative inline-block text-left mr-10">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md border border-gray-300 bg-zinc-900 text-white px-3 py-2 text-sm shadow-sm mr-6 cursor-pointer"
      >
        <span>🕒</span>
        {selectedLabel}
        <svg
          className="h-4 w-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={divRef}
          className="absolute  z-10 mt-2 w-40 rounded-md border border-gray-200 bg-zinc-900 text-white shadow-lg"
        >
          <div className="p-2">
            {options.map((option) => (
              <button
                key={option.dateRange}
                onClick={() => handleSelect(option.dateRange)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-zinc-800 cursor-pointer"
              >
                <span
                  className={`h-4 w-4 rounded-full border ${
                    dateRange === option.dateRange
                      ? "border-yellow-400 bg-yellow-400"
                      : "border-gray-400"
                  }`}
                />
                {option.label}
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200" />
        </div>
      )}
    </div>
  )
}
