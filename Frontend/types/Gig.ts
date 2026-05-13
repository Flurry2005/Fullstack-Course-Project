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
  content: string;
  rating: number;
};

export type Gig = {
  _id?: string;
  sellerUsername?: string;
  sellerId?: string;
  title?: string;
  primaryImagePreview?: string;
  secondaryImagePreview?: string;
  ternaryImagePreview?: string;
  category?: Category;
  tags?: string[];
  description?: string;
  basic?: Package;
  standard?: Package;
  premium?: Package;
  reviews?: Review[];
  pending?: boolean;
};
