import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Languages } from './languages.model';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';

@Module({
  controllers: [LanguagesController],
  providers: [LanguagesService],
  imports: [SequelizeModule.forFeature([Languages])],
})
export class LanguagesModule {}
