import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceOptions } from './db/data-source';
import { ParcelsModule } from './parcels/parcels.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ParcelsModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
