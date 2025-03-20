import { Controller, Get, Param } from '@nestjs/common';
import { HotelResponse } from './dto/hotel.response.dto';
import { Hotel } from './hotel.entity';
import { HotelService } from './hotel.service';

@Controller('api')
export class HotelController {
  constructor(private readonly hotelservice: HotelService) {}

  @Get('/listhotel')
  async getListHotel(): Promise<HotelResponse<Hotel[]>> {
    const listHotel = await this.hotelservice.getListHotel();
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: listHotel,
    };
  }

  @Get('/listhotel/:id')
  async getHotelById(@Param('id') id: number): Promise<HotelResponse<Hotel[]>> {
    const oneHotel = await this.hotelservice.getHotelByID(id);
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: [oneHotel],
    };
  }
}
