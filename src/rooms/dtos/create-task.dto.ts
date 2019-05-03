import { IsString, IsInt, IsEnum, IsNotEmpty, MaxLength } from 'class-validator'

export enum EState {
  IS_CHECKED = 'is-checked',
  IS_NOT_CHECKED = 'is-not-checked',
}

export class CreateTaskDto {
  @IsInt()
  @IsNotEmpty()
  @MaxLength(10)
  readonly order: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  readonly message: string

  @IsEnum(EState)
  @IsNotEmpty()
  @MaxLength(10)
  readonly state: EState
}
