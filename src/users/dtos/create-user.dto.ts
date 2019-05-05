import { IsString, IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly login: string

  @IsString()
  @IsNotEmpty()
  readonly password: string

  @IsString()
  @IsNotEmpty()
  readonly name: string
}
