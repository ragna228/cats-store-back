import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Languages } from './languages.model';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguagesDto } from './dto/update-languages.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectModel(Languages) private languagesRepository: typeof Languages,
  ) {}

  async create(dto: CreateLanguageDto) {
    return this.languagesRepository.create({
      ...dto,
    });
  }

  async update(dto: UpdateLanguagesDto) {
    const [columns] = await this.languagesRepository.update(
      {
        text: dto.text,
      },
      {
        where: {
          key: dto.key,
        },
      },
    );

    if (columns == 0) {
      throw new BadRequestException({
        message: 'Такой записи нет',
      });
    }

    return this.languagesRepository.findOne({
      where: {
        key: dto.key,
      },
    });
  }

  async getAll() {
    return this.languagesRepository.findAll();
  }
}
