import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HotelResponse } from './dto/hotel.response.dto';
import { Hotel } from './hotel.entity';
import { HotelService } from './hotel.service';
import { HotelRequest } from './dto/hotel.request.dto';

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

  @Post('/create/hotel')
  async createHotel(
    @Body() hotelrequest: HotelRequest,
  ): Promise<HotelResponse<Hotel[]>> {
    const create = await this.hotelservice.createHotel(
      hotelrequest.name,
      hotelrequest.price,
    );
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: [create],
    };
  }
}
