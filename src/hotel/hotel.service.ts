import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotel: Repository<Hotel>,
  ) {}

  async getListHotel(): Promise<Hotel[]> {
    return this.hotel.find();
  }
}
