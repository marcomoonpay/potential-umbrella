import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { SendRequest } from "../types/SendRequest";
import { ValidationError } from "../types/ValidationError";

// Validator for SendRequest endpoint payload
export async function validateSendRequest(payload: Object): Promise<void> {
  const initialInstance = plainToInstance(SendRequest, payload);

  const errors = await validate(initialInstance);

  if (errors.length > 0) {
    const errorMessage = errors
      .flatMap((error) => {
        return Object.values(error.constraints).map((constraint) => {
          return constraint;
        });
      })
      .join(", ");
    throw new ValidationError(errorMessage);
  }
}
