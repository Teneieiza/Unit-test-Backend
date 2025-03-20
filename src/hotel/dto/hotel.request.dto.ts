import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HotelRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
