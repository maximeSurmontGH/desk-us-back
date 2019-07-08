import { IsString, IsNotEmpty, MaxLength } from 'class-validator'

export class AddRoomIdDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly roomId: string
}
