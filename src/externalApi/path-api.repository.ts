import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

interface Path {
  origin: {
    x: number;
    y: number;
  };
  destination: {
    x: number;
    y: number;
  };
}

@Injectable()
export class PathApiRepository {
  private readonly logger = new Logger(PathApiRepository.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    httpService.axiosRef.defaults.headers.Authorization =
      configService.get<string>('KAKAO_REST_API_KEY');
    httpService.axiosRef.defaults.headers.common['Content-Type'] =
      'application/json';
  }

  async getPathInfo(path: Path): Promise<unknown> {
    const { origin, destination } = path;
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://apis-navi.kakaomobility.com/v1/directions`, {
          params: {
            origin: `${origin.x},${origin.y}`,
            destination: `${destination.x},${destination.y}`,
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
