import { IsInt, IsNotEmpty, Max } from 'class-validator'

export class UpdateTaskOrderDto {
  @IsInt()
  @IsNotEmpty()
  @Max(1000)
  readonly order: number
}
