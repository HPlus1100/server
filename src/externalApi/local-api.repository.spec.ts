import { Test, TestingModule } from '@nestjs/testing';
import { LocalApiRepository } from './local-api.repository';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('CallService', () => {
  let repository: LocalApiRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // TO FIX: ConfigModule상대경로를 잡지 못해 루트 경로로 했다.
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [LocalApiRepository, ConfigService],
    }).compile();
    repository = module.get<LocalApiRepository>(LocalApiRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('AXIS 요청', () => {
    it('응답 값에 우편주소 속성이 있다.', async () => {
      const response = await repository.getAxisbyAddress(
        '서울시 마포구 독막로 266',
      );

      expect(response).toHaveProperty(
        'documents[0].address.address_name',
        '서울 마포구 대흥동 660',
      );
    });
  });
});
