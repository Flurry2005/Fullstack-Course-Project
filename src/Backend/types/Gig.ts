import type { ObjectId } from "mongodb";

export type Category = {
  main?: string;
  sub?: string;
};

export type Package = {
  price?: string;
  delivery?: string;
  features?: string[];
};

export type Gig = {
  seller?: string;
  title?: string;
  category?: Category;
  tags?: string[];
  description?: string;
  basic?: Package;
  standard?: Package;
  premium?: Package;
};
