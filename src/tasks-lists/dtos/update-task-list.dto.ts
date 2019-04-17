import { IsString, IsNotEmpty, IsInt, MaxLength } from 'class-validator'

export class UpdateTaskListDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly title: string

  @IsInt()
  @IsNotEmpty()
  @MaxLength(10)
  readonly order: number
}
