export type Category = {
  main?: string;
  sub?: string;
};

export type Package = {
  price?: string | number;
  delivery?: string;
  features?: string[];
};

export type Gig = {
  _id?: string;
  sellerUsername?: string;
  sellerId?: string;
  title?: string;
  category?: Category;
  tags?: string[];
  description?: string;
  basic?: Package;
  standard?: Package;
  premium?: Package;
};
