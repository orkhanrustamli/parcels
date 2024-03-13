import { BadRequestException } from '@nestjs/common';

class ParcelAlreadyExistsException extends BadRequestException {
  constructor(sku: string) {
    super(`Parcel with "${sku}" SKU already exists`);
  }
}

export default ParcelAlreadyExistsException;
