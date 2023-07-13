export class UserNotRegisteredError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotRegisteredError";
  }
}
