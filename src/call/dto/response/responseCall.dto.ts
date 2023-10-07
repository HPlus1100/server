import { Exclude } from 'class-transformer';

/**
 * exclude가 dto에 정의되지 않은 속성을 제외시켜줌
 * plainToInstance를 통해 entity객체를 dto객체로 변환할 때 사용
 */
@Exclude()
export class ResponseCallDto {
  //TODO : 내용 추가
}
