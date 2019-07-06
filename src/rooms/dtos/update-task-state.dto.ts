import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator'
import { EState } from './create-task.dto'

export class UpdateTaskStateDto {
  @IsEnum(EState)
  @IsNotEmpty()
  @MaxLength(30)
  readonly state: EState
}
