import { IsEnum } from 'class-validator';
import { Status } from '../schema/user.schema';

export class UpdateStatusDto {
  @IsEnum(Status, { message: 'Status must be either Online or Offline.' })
  status: Status;
}
