export type Category = {
  main?: string;
  sub?: string;
  main_slug?: string;
  sub_slug?: string;
};

export type Package = {
  price?: string | number;
  delivery?: string;
  features?: string[];
};

export type Review = {
  username: string;
  rating: number;
  comment?: string;
  createdAt?: string;
};

export type Gig = {
  _id?: string;
  sellerUsername?: string;
  sellerId?: string;
  title?: string;
  primaryImagePreview?: string;
  secondaryImagePreview?: string;
  ternaryImagePreview?: string;
  description?: string;
  tags?: string[];
  category?: Category;
  rating?: number;
  basic?: Package;
  standard?: Package;
  premium?: Package;
  reviews?: Review[];
  pending?: boolean;
  paused?: boolean;
  updatedAt?: Date;
  views: number,
};
