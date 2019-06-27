import { IsNumberString, IsNotEmpty } from 'class-validator'

export class TasksListIdDto {
  @IsNumberString()
  @IsNotEmpty()
  readonly tasksListId: number
}
