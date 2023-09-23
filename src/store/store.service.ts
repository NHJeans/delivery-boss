import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Store } from '@prisma/client';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  // TODO 사장님은 업장 정보를 등록 및 수정, 삭제를 할 수 있어야 한다 -> 등록 / 수정 / 삭제 시 사장 권한 확인
  // TODO 사장님은 업장 정보를 오직 1개만 갖고 있을 수 있어야 합니다. -> OwnerId로 구분 예정, OwnerId는 로그인 정보에서 끌어오기!!
  // TODO 업장 정보 목록은 모두가 볼 수 있어야 합니다.

  // 업장 정보 생성
  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    // OwnerId가 5 이상일 떄 에러남 => 등록된 OwnerId가 4까지라서 에러 났음
    // TODO: OwnerId 정보를 담을 방법 정해서 코드 수정, (지금은 body에서 직접 입력, Owner : Store = 1 : 1)
    // ? findFirst -> findUnique 바꾸면 where 에서 에러남(where 밑에 빨간 줄)
    // ? -> OwnerIdr가 unique 값이 아니라 그렇당 코드를 의심하지 말고 항상 나를 의심해보쟈!! ><
    // 프리즈마에서 초기 1:1 유니크 연결인데 1:n 관계로 설정해둬서 문제가 생김

    const store = await this.prisma.store.findUnique({ where: { OwnerId: createStoreDto.OwnerId } });
    if (store) {
      throw new HttpException('이미 가게가 등록되어 있습니다.', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.store.create({ data: createStoreDto });
  }

  // 전체 업장 조회 (메인페이지로 연결)
  async findAllStores(): Promise<Store[]> {
    return this.prisma.store.findMany();
  }

  // 업장 세부 조회
  async findOneStore(id: number): Promise<Store> {
    return this.prisma.store.findUnique({ where: { id } });
  }

  // 업장 정보 수정
  // TODO 로그인 정보로 수정 권한 추가
  async updateStore(id: number, updateStoreDto: UpdateStoreDto): Promise<object> {
    // ? 여기는 return 왜 안붙여도 되는지 궁금하당
    const store = await this.prisma.store.findUnique({ where: { id } });

    if (!store) {
      throw new HttpException('업장 정보가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.store.update({ where: { id }, data: updateStoreDto });

    return { message: '업장 정보 수정이 완료되었니다.' };
  }

  // 업장 삭제
  // TODO 로그인 정보로 삭제 권한 추가
  // delete 완료 후 에러 메시지 작성
  async deleteStore(id: number): Promise<object> {
    if (!id) {
      throw new HttpException('업장 정보가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.store.delete({ where: { id } });

    return { message: '업장 정보 삭제가 완료되었습니다.' };
  }
}
