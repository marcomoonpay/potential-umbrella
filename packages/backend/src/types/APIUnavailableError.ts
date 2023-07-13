export class APIUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "APIUnavailableError";
  }
}
