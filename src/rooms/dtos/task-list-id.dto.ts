import { IsNumberString, IsNotEmpty } from 'class-validator'

export class TaskListIdDto {
  @IsNumberString()
  @IsNotEmpty()
  readonly taskListId: number
}
