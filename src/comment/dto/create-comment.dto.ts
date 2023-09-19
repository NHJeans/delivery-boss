import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { max } from 'rxjs';

// * service, controller 작성 후 항목은 빼고, 검사 부분은 추가해보기!

export class CreateCommentDto {
  // @IsNumber()
  // @IsNotEmpty()
  // @ApiProperty()
  // //* readonly 는 왜 쓰는 거지...? 있으면 뭐가 좋을까 궁금하당 그치만 일단은 프로젝트 하고 다음에 알아보쟝!!

  //   TypeScript에서 readonly는 클래스의 프로퍼티에 적용할 수 있는 키워드입니다. 이 키워드는 객체가 생성된 후 해당 프로퍼티가 변경되지 않아야 함을 나타냅니다. 이로써 해당 프로퍼티의 불변성(immutability)을 강제할 수 있습니다.

  // NestJS 애플리케이션과 같은 프로젝트에서 데이터 전송 객체(Data Transfer Objects, DTOs)를 사용할 때 readonly를 사용하면 다음과 같은 이점이 있습니다:

  // 불변성: readonly를 사용하면 해당 프로퍼티는 객체 생성 시에만 초기화할 수 있고, 이후에는 수정할 수 없습니다. 이로 인해 버그를 줄이고 코드를 더 예측 가능하게 만들 수 있습니다.

  // 코드 가독성: readonly 속성은 다른 개발자에게 이 프로퍼티는 객체 생성 후에 변경되지 않아야 함을 명확하게 알려줍니다. 이는 코드 이해를 돕습니다.

  // 타입 안전성: readonly를 사용하면 컴파일 시에 의도하지 않은 재할당을 캐치할 수 있어, 런타임 오류를 줄일 수 있습니다.

  // 데이터 무결성: 특히 DTO의 맥락에서, 프로퍼티를 readonly로 설정하면 해당 객체가 데이터를 안전하게 전송하는 단순하고 변경 불가능한 데이터 구조임을 나타냅니다.

  // 문서화: API 문서를 자동으로 생성하는 도구를 사용할 때, readonly 프로퍼티는 API 사용자에게 어떤 프로퍼티가 변경되지 않아야 하는지 명확하게 알려줍니다.

  // 예를 들어:

  // typescript
  //
  // class CreateCatDto {
  //   readonly name: string;
  //   readonly age: number;
  //   readonly breed: string;
  // }
  // 이 예에서 CreateCatDto는 새로운 고양이를 생성하기 위해 필요한 객체의 구조를 정의합니다. readonly 키워드는 CreateCatDto 객체가 인스턴스화된 후에는 그 프로퍼티가 변경되지 않아야 함을 명확하게 합니다. 이는 DTO의 목적, 즉 정확한 데이터 세트를 전송하고 부분 수정을 허용하지 않는 것과 잘 어울립니다.

  // readonly id: number;

  // @IsNumber()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly CustomerId: number;

  // @IsNumber()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly OrderId: number;

  // @IsNumber()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly StoreId: number;

  // * 사실 review_content는 없어도 되긴 함
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly review: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  @ApiProperty()
  readonly star: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly CustomerId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly OrderId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly StoreId: number;
}
