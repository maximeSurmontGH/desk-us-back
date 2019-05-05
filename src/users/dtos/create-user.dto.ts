import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(30)
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly login: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly password: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly name: string
}
