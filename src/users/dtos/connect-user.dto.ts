import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator'

export class ConnectUserDto {
  @IsString()
  @MaxLength(20)
  readonly login?: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly password: string
}
