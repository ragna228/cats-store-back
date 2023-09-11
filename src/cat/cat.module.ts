import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cat } from './models/cat.model';
import { CatService } from './cat.service';
import { ICatService } from '../utils/serivces/i-cat.service';

@Module({
  imports: [SequelizeModule.forFeature([Cat])],
  controllers: [CatController],
  providers: [
    {
      provide: ICatService,
      useClass: CatService,
    },
  ],
})
export class CatModule {}
