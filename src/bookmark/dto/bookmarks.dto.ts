import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class BookmarkDto {
  @IsNotEmpty()
  title: string;
  @IsUrl()
  link: string;
  @IsNotEmpty()
  userId: number;
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  id: number;
}
