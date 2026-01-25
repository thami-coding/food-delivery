export class ApiError extends Error {
  statusCode?: string
  constructor(message: string, statusCode?: string) {
    super(message)
    this.name = "ApiError"
    this.statusCode = statusCode
  }
}
