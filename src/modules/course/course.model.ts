import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export class CourseCreationAttributes {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  id: number;

  @ApiProperty({
    example: 'Adobe',
  })
  tag: string;

  @ApiProperty({
    example: 'Name',
  })
  title: string;

  @ApiProperty({
    example: 100,
  })
  price: number;

  @ApiProperty({
    example: 1,
  })
  stars: number;

  @ApiProperty({
    example: 'AuthorName',
  })
  authorName: string;

  @ApiProperty({
    example: './images.png',
  })
  image: string;

  @ApiProperty({
    example: './images.png',
  })
  authorImage: string;

  @ApiProperty({
    example: 'asd',
  })
  description: string;

  @ApiProperty({
    example: 'Beginner',
  })
  courseLevel: string;

  @ApiProperty({
    example: '10 week',
  })
  courseDuration: string;
}

@Table({ tableName: 'course', createdAt: false, updatedAt: false })
export class Course extends Model<CourseCreationAttributes> {
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tag: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stars: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  authorName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  authorImage: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  courseLevel: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  courseDuration: string;
}
