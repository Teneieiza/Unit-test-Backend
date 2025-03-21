import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {
  HotelDashboardResponse,
  HotelDto,
  HotelResponse,
} from './dto/hotel.response.dto';
import { Hotel } from './hotel.entity';
import { HotelService } from './hotel.service';
import { HotelRequest, SearchHotelRequest } from './dto/hotel.request.dto';
import { ResponseInterceptor } from 'src/config/errorhandler/response.error';
import { HttpExceptionFilter } from 'src/config/errorhandler/exception.error';

@Controller('api')
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class HotelController {
  constructor(private readonly hotelservice: HotelService) {}

  @Post('/create/hotel')
  @HttpCode(200)
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

  @Get('/listhotel')
  async getListHotel(): Promise<HotelResponse<HotelDto[]>> {
    const listHotel = await this.hotelservice.getListHotel();
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: listHotel,
    };
  }

  @Get('/listhotel/:id')
  async getHotelById(
    @Param('id') id: number,
  ): Promise<HotelResponse<HotelDto[]>> {
    const oneHotel = await this.hotelservice.getHotelByID(id);
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: [oneHotel],
    };
  }

  @Post('/search/hotel')
  @HttpCode(200)
  async searchHotelByDate(
    @Body() searchhotelrequest: SearchHotelRequest,
  ): Promise<HotelResponse<HotelDto[]>> {
    const hotel = await this.hotelservice.searchHotelByDate(searchhotelrequest);

    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: hotel,
    };
  }

  @Get('/dashboard/hotel')
  async getListHotelWithDashboard(): Promise<
    HotelDashboardResponse<HotelDto[]>
  > {
    const dashboardHotel = await this.hotelservice.getListHotelWithDashboard();
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: dashboardHotel,
    };
  }
}
