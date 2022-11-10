import { TransformToNumber } from "@byndyusoft/class-validator-extended";
import { IsEmail, IsInt, IsNumberString, IsString } from "class-validator";

export class UserDto {
  /**
   * User ID
   * @example 1
   */
  @IsNumberString({ no_symbols: true })
  public readonly userId!: string;

  /**
   * User name
   * @example user
   */
  @IsString()
  public readonly name!: string;

  /**
   * User email
   * @example user@example.com
   */
  @IsEmail()
  public readonly email!: string;

  /**
   * User version
   * @example 2
   */
  @TransformToNumber()
  @IsInt()
  public readonly userVersion!: number;
}
