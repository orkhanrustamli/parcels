export type Parcel = {
  id: number;
  traceId: string;
  sku: string;
  description: string;
  country: string;
  town: string;
  streetAddress: string;
  deliveryDate: string;
};

export type CreateParcelBody = Omit<Parcel, 'id' | 'traceId'>;

export type CreateParcelResponse = Parcel;

export type GetParcelsResponse = {
  success: boolean;
  data: Parcel[];
  pagination: Pagination;
};

export type Pagination = {
  total: number;
  page: number;
  pages: number;
  limit: number;
};
