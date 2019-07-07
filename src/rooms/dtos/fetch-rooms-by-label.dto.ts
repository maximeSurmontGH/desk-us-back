import { IsString, IsNotEmpty, MaxLength } from 'class-validator'

export class FetchRoomsByLabelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly title: string
}
