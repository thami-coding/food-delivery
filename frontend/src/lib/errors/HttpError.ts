export class HttpError extends Error {
  statusCode?: number
  fields?: Record<string, string>

  constructor(
    message: string,
    statusCode?: number,
    fields?: Record<string, string>,
  ) {
    super(message)
    this.name = "HttpError"
    this.statusCode = statusCode
    this.fields = fields
  }
}
