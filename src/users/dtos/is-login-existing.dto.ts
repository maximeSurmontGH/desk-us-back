import { IsString, IsNotEmpty, MaxLength } from 'class-validator'

export class IsLoginExistingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly login: string
}
