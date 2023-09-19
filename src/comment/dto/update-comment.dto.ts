// * import { PartialType } from '@nestjs/mapped-types'; 랑 밑에 부분이랑 뭐가 다른 지 알아보쟈!

import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
