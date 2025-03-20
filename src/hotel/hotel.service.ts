import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Repository } from 'typeorm';

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
  async getListHotel(): Promise<Hotel[]> {
    return this.hotel.find();
  }

  //GET one hotel
  async getHotelByID(id: number): Promise<Hotel> {
    const findHotel = await this.hotel.findOne({ where: { id } });

    if (!findHotel)
      throw new NotFoundException(`Hotel with ID ${id} is not found`);

    return findHotel;
  }

  //GET Dashboard hotel
  async getListHotelWithDashboard() {
    const hotels = await this.hotel.find();

    if (!hotels.length) {
      throw new NotFoundException('No hotels found');
    }

    const allHotel = hotels.length;

    const highestPrice = hotels.reduce((prev, current) =>
      current.price > prev.price ? current : prev,
    );

    const lowestPrice = hotels.reduce((prev, current) =>
      current.price < prev.price ? current : prev,
    );

    const lastHotelAdded = hotels.reduce((prev, current) =>
      new Date(current.doingtime) > new Date(prev.doingtime) ? current : prev,
    );

    return {
      Data: hotels,
      Dashboard: {
        AllHotel: allHotel,
        Price: {
          High: highestPrice.name,
          Low: lowestPrice.name,
        },
        LastHotelAdd: new Date(lastHotelAdded.doingtime).toISOString(),
      },
    };
  }
}
