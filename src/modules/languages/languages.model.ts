import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export class LanguagesCreationAttributes {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  id: number;

  @ApiProperty({
    example: 'key',
    description: 'Ключ',
  })
  key: string;

  @ApiProperty({
    example: 'Текс',
    description: 'Текст',
  })
  text: string;
}
@Table({ tableName: 'languages', createdAt: false, updatedAt: false })
export class Languages extends Model<LanguagesCreationAttributes> {
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  key: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;
}
