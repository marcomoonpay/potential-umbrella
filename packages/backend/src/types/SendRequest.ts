import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SendRequest {
  @IsString({ message: "userid must be a string" })
  @IsNotEmpty({ message: "userid cannot be empty" })
  userid: string;

  @IsString({ message: "wish must be a string" })
  @IsNotEmpty({ message: "wish cannot be empty" })
  @MaxLength(100, {
    message: "wish must be less that 100 characters",
  })
  wish: string;
}
