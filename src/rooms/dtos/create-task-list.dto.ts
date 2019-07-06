import { IsString, IsNumber, IsNotEmpty, MaxLength, Max } from 'class-validator'

export class CreateTasksListDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly title: string

  @IsNumber()
  @IsNotEmpty()
  @Max(1000)
  readonly order: number
}
