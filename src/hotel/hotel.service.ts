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

  //Get all hotel
  async getListHotel(): Promise<Hotel[]> {
    return this.hotel.find();
  }

  //Get one hotel
  async getHotelByID(id: number): Promise<Hotel> {
    const findHotel = await this.hotel.findOne({ where: { id } });

    if (!findHotel)
      throw new NotFoundException(`Hotel with ID ${id} is not found`);

    return findHotel;
  }
}
