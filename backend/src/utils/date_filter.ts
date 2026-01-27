export type DateRange = "today" | "30" | "60" | "90" | "all"

export function getDateRange(dateRange: DateRange) {
  const now = new Date()

  switch (dateRange) {
    case "today": {
      const start = new Date()
      start.setHours(0, 0, 0, 0)
      return { start, end: now }
    }

    case "30":
    case "60":
    case "90": {
      const days = Number(dateRange)
      const start = new Date()
      start.setDate(now.getDate() - days)
      return { start, end: now }
    }

    case "all":
    default:
      return null
  }
}