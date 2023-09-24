import { PartialType } from '@nestjs/swagger';
import { CreateStoreDto } from './create-store.dto';

export class FindStoreDto extends PartialType(CreateStoreDto) {}
