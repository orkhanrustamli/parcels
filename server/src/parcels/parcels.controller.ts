import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateParcelDto } from './dtos/create-parcel.dto';
import { GetParcelsQueryDto } from './dtos/get-parcels-query.dto';
import { ParcelsService } from './parcels.service';

@Controller('parcels')
export class ParcelsController {
  constructor(private parcelsService: ParcelsService) {}

  @Get()
  async getParcels(@Query() query: GetParcelsQueryDto) {
    const { page = 1, limit = 10 } = query;
    const [data, total] = await this.parcelsService.list(query, {
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      success: true,
      data,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    };
  }

  @Post()
  async createParcel(@Body() body: CreateParcelDto) {
    const parcel = await this.parcelsService.create(body).catch((e) => {
      throw e;
    });

    return {
      success: true,
      data: parcel,
    };
  }
}
