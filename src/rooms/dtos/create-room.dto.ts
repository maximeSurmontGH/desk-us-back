import { IsString, IsNotEmpty, MaxLength } from 'class-validator'

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly title: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  readonly description: string
}
