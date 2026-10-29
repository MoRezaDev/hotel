import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { DatabaseService } from '../../database/database.service.js';
import { ApproveCommentDto } from './dto/approve-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';

@Injectable()
export class CommentService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createComment(createCommentDto: CreateCommentDto) {
    return await this.databaseService.comment.create({
      data: createCommentDto,
    });
  }

  async approveComment(approveCommentDto: ApproveCommentDto) {
    return await this.databaseService.comment.update({
      where: { id: approveCommentDto.commentId },
      data: {
        approved: approveCommentDto.approve,
      },
    });
  }

  async updateCommentDto(
    updateCommentDto: UpdateCommentDto,
    id: string,
    userId: string,
  ) {
    return await this.databaseService.comment.update({
      where: { id, userId },
      data: updateCommentDto,
    });
  }

  async deleteComment(id: string, userId: string) {
    return await this.databaseService.comment.delete({
      where: { id, userId },
    });
  }

  //for admin
  async deleteCommentFromAdmin(commentId: string) {
    return await this.databaseService.comment.delete({
      where: { id: commentId },
    });
  }

 
}
