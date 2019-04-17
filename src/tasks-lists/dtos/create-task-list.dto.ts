import { IsString, IsNumber, IsNotEmpty, MaxLength } from 'class-validator'

export class CreateTaskListDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly title: string

  @IsNumber()
  @IsNotEmpty()
  @MaxLength(10)
  readonly order: number
}
