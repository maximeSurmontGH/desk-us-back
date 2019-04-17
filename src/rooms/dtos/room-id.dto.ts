import { IsNumberString, IsNotEmpty } from 'class-validator'

export class RoomIdDto {
  @IsNumberString()
  @IsNotEmpty()
  readonly roomId: number
}
