import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class LocalApiRepository {
  private readonly logger = new Logger(LocalApiRepository.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    httpService.axiosRef.defaults.headers.Authorization =
      configService.get<string>('KAKAO_REST_API_KEY');
    httpService.axiosRef.defaults.headers.common['Content-Type'] =
      'application/json';
  }

  async getAxisbyAddress(address: string): Promise<unknown> {
    this.logger.log(this.httpService.axiosRef.defaults.headers.Authorization);
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://dapi.kakao.com/v2/local/search/address`, {
          params: {
            query: address,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw `Error: ${error}`;
          }),
        ),
    );
    return data;
  }
}
