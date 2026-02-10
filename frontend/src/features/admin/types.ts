export type DateRange = "today" | "30" | "60" | "90" | "all"
export type Params = {
  page: number
  limit: number
  filters?: { dateRange: DateRange; status: string }
}
