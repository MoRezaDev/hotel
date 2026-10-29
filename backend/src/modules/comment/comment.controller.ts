import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGurd } from '../../gurds/jwt-auth.gurd.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentService } from './comment.service.js';
import { Role, RoleAcessGurd } from '../../gurds/role.gurd.js';
import { ApproveCommentDto } from './dto/approve-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';

interface AuthenthicatedRequest extends Request {
  user: {
    id: string;
    role: string;
  };
}

@UseGuards(JwtAuthGurd)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Delete('delete/:id')
  async deleteComment(
    @Param('id') id: string,
    @Req() req: AuthenthicatedRequest,
  ) {
    const userId = req.user.id;
    return this.commentService.deleteComment(id, userId);
  }

  @Patch('update/:id')
  async updateComment(
    @Body() updatecommentDto: UpdateCommentDto,
    @Param('id') id: string,
    @Req() req: AuthenthicatedRequest,
  ) {
    const userId = req.user.id;
    return this.commentService.updateCommentDto(updatecommentDto, id, userId);
  }

  //for Admin

  @Role('admin')
  @UseGuards(RoleAcessGurd)
  @Delete('admin/delete')
  async deleteCommentFromAdmin(@Body() deleteDto: { commentId: string }) {
    return this.commentService.deleteCommentFromAdmin(deleteDto.commentId);
  }

  @Role('admin')
  @UseGuards(RoleAcessGurd)
  @Post('admin/approve')
  async approveComment(@Body() approveCommentDto: ApproveCommentDto) {
    return this.commentService.approveComment(approveCommentDto);
  }
}
