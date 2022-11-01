import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PACKAGE_NAME } from './config/grpc/grpc.constants';

@Injectable()
export class AppService implements OnModuleInit {
  private heroesService: any;

  constructor(@Inject(PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.heroesService = this.client.getService<any>('HeroesService');
  }

  getHero(): Observable<string> {
    return this.heroesService.findOne({ id: 1 });
  }
}
