import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Parcel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  traceId: string;

  @Column({ unique: true })
  sku: string;

  @Index()
  @Column('text')
  description: string;

  @Column()
  streetAddress: string;

  @Column()
  town: string;

  @Index()
  @Column()
  country: string;

  @Column({ type: 'date' })
  deliveryDate: string;
}
