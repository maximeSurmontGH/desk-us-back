import { IsString, IsNotEmpty, MaxLength } from 'class-validator'

export class UpdateTasksListTitleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly title: string
}
