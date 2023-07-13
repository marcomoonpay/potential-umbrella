export class UserTooOldError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserTooOldError";
  }
}
