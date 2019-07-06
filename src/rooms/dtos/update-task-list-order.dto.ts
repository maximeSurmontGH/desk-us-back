import { IsNumber, IsNotEmpty, Max } from 'class-validator'

export class UpdateTasksListOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @Max(1000)
  readonly order: number
}
