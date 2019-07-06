import { IsInt, IsNotEmpty, Max } from 'class-validator'

export class UpdateTaskOrderDto {
  @IsInt()
  @IsNotEmpty()
  @Max(10)
  readonly order: number
}
