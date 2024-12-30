export class BadRequestError extends Error {
  constructor() {
    super('Booking not found.')
  }
}
