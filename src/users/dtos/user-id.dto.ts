import { IsNumberString, IsNotEmpty } from 'class-validator'

export class UserIdDto {
  @IsNumberString()
  @IsNotEmpty()
  readonly userId: string
}
