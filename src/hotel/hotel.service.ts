import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Repository } from 'typeorm';
import { SearchHotelRequest } from './dto/hotel.request.dto';
import { formatDateTime } from 'src/util/formatdate';
import { HotelDto } from './dto/hotel.response.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotel: Repository<Hotel>,
  ) {}

  //POST create hotel
  async createHotel(name: string, price: number): Promise<Hotel> {
    const createHotel = this.hotel.create({ name: name, price: price });
    return this.hotel.save(createHotel);
  }

  //GET all hotel
  async getListHotel(): Promise<HotelDto[]> {
    const allhotel = await this.hotel.find();

    if (!allhotel.length) {
      throw new NotFoundException('No hotels found');
    }

    return allhotel.map((hotel) => ({
      ...hotel,
      doingtime: formatDateTime(hotel.doingtime),
    }));
  }

  //GET one hotel
  async getHotelByID(id: number): Promise<HotelDto> {
    const findHotel = await this.hotel.findOne({ where: { id } });

    if (!findHotel)
      throw new NotFoundException(`Hotel with ID ${id} is not found`);

    return {
      ...findHotel,
      doingtime: formatDateTime(findHotel.doingtime),
    };
  }

  //POST Search hotel
  async searchHotelByDate(
    searchhotelrequest: SearchHotelRequest,
  ): Promise<HotelDto[]> {
    const { date } = searchhotelrequest;

    const searchDate = new Date(date);
    if (isNaN(searchDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    const formattedDate = searchDate.toISOString().split('T')[0];

    const hotel = await this.hotel
      .createQueryBuilder('hotel')
      .where('Date(hotel.doingtime) = :searchDate', {
        searchDate: formattedDate,
      })
      .getMany();

    if (hotel.length === 0) {
      throw new NotFoundException(`No hotel on ${formattedDate}`);
    }

    return hotel.map((hotel) => ({
      ...hotel,
      doingtime: formatDateTime(hotel.doingtime),
    }));
  }

  //GET Dashboard hotel
  async getListHotelWithDashboard() {
    const hotels = await this.hotel.find();

    if (!hotels.length) {
      throw new NotFoundException('No hotels found');
    }

    const formatdate = hotels.map((hotel) => ({
      ...hotel,
      doingtime: formatDateTime(hotel.doingtime),
    }));

    const allHotel = formatdate.length;

    const highestPrice = formatdate.reduce((prev, current) =>
      current.price > prev.price ? current : prev,
    );

    const lowestPrice = formatdate.reduce((prev, current) =>
      current.price < prev.price ? current : prev,
    );

    const lastHotelAdded = formatdate.reduce((prev, current) =>
      new Date(current.doingtime) > new Date(prev.doingtime) ? current : prev,
    );

    return {
      Data: formatdate,
      Dashboard: {
        AllHotel: allHotel,
        Price: {
          High: highestPrice.name,
          Low: lowestPrice.name,
        },
        LastHotelAdd: lastHotelAdded.doingtime,
      },
    };
  }
}
