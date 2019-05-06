import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'

export class IsEmailExistingDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(30)
  readonly email: string
}
