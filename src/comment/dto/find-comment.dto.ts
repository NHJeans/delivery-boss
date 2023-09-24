
import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class FindCommentDto extends PartialType(CreateCommentDto) {}
