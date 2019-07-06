import { IsString, IsNotEmpty, MaxLength } from 'class-validator'

export class UpdateTaskMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  readonly message: string
}
