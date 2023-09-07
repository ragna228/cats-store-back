import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '../models/cat.model';

export class SearchCatDto {
  @ApiProperty({
    example: 1,
    description: 'Страница',
  })
  row: number;
  @ApiPropertyOptional({
    example: 'a',
    description: 'Запрос',
  })
  q?: string;
  @ApiPropertyOptional({
    example: 1,
    description: 'Мин возраст',
  })
  minAge?: number;
  @ApiPropertyOptional({
    example: 3,
    description: 'Макс возраст',
  })
  maxAge?: number;
  @ApiPropertyOptional({
    example: 1,
    description: 'Мин цена',
  })
  minPrice?: number;
  @ApiPropertyOptional({
    example: 100,
    description: 'Макс цена',
  })
  maxPrice?: number;
  @ApiPropertyOptional({
    example: [Gender.MAN],
    description: 'Нужные полы',
  })
  genders?: Gender[];
  @ApiPropertyOptional({
    example: 'red',
    description: 'Возможный цвет',
  })
  colors?: string;
  @ApiPropertyOptional({
    example: false,
    description: 'Рекомендован',
  })
  isRecommended?: boolean;
}
