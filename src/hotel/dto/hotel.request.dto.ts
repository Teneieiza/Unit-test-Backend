import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HotelRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class SearchHotelRequest {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;
}
