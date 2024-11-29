export class BadRequestError extends Error {
  constructor() {
    super('User not found.')
  }
}
