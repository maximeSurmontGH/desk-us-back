import { IsNumberString, IsNotEmpty } from 'class-validator'

export class TaskIdDto {
  @IsNumberString()
  @IsNotEmpty()
  readonly taskId: number
}
