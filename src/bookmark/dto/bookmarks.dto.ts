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

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  id: number;
}
