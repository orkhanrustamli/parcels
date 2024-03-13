import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, EqualOperator, FindOperator, Raw } from 'typeorm';
import { Parcel } from './parcel.entity';
import { CreateParcelDto } from './dtos/create-parcel.dto';
import { nanoid } from 'nanoid';
import { GetParcelsQueryDto } from './dtos/get-parcels-query.dto';
import { isQueryFailedError } from 'src/db/utils';
import ParcelAlreadyExistsException from './exceptions/alreadyExists.exception';

export interface Pagination {
  skip: number;
  take: number; // Limit
}

@Injectable()
export class ParcelsService {
  constructor(@InjectRepository(Parcel) private repo: Repository<Parcel>) {}

  list(queryDto: GetParcelsQueryDto, pagination: Pagination) {
    return this.repo.findAndCount({
      where: this.mapQueryToWhere(queryDto),
      ...pagination,
      order: { id: 'DESC' },
    });
  }

  create(parcelDto: CreateParcelDto) {
    const parcel = this.repo.create({ ...parcelDto, traceId: nanoid(8) });

    return this.repo.save(parcel).catch((e: unknown) => {
      if (isQueryFailedError(e)) {
        if (e.code === '23505') {
          throw new ParcelAlreadyExistsException(parcelDto.sku);
        }
      }
    });
  }

  mapQueryToWhere(query: GetParcelsQueryDto) {
    const searchFields = ['description', 'country'] as const;
    const where: Partial<
      Record<
        (typeof searchFields)[number],
        EqualOperator<string> | FindOperator<string>
      >
    > = {};

    Object.keys(query).forEach((field) => {
      const operator = Object.keys(query[field])[0];
      const value = query[field][operator];

      switch (operator) {
        case 'is':
          where[field] = Raw((alias) => `LOWER(${alias}) = LOWER(:value)`, {
            value,
          });
          break;
        case 'contains':
          where[field] = ILike(`%${value}%`);
          break;
        case 'starts':
          where[field] = ILike(`${value}%`);
          break;
        case 'ends':
          where[field] = ILike(`%${value}`);
          break;
        default:
          break;
      }
    });

    return where;
  }
}
