export type Category = {
  main?: string;
  sub?: string;
  main_slug?: string;
  sub_slug?: string;
};

export type Package = {
  price?: string;
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
  pending?: boolean;
};
