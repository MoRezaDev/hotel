import { IsBoolean, IsUUID } from 'class-validator';

export class ApproveCommentDto {
  @IsBoolean()
  approve: boolean;

  @IsUUID()
  commentId: string;
}
