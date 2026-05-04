
import type { Gig } from "../../types/Gig";
import gigsModel from "../models/gigsModel";
import { Request, Response, NextFunction } from "express";




class GigController {
  async createGig(req: Request, res: Response, next: NextFunction) {

    const newGig: Gig = req.body;

    console.log(newGig);
    if (
      !newGig.title ||
      !newGig.category?.main ||
      !newGig.category?.sub ||
      !newGig.description ||
      !newGig.tags
    ) {
      return false;
    }

    const isValidPrice = (price: any) =>
      price && !Number.isNaN(parseInt(price));
    const hasFeatures = (pkg: any) =>
      Array.isArray(pkg?.features) && pkg.features.length > 0;

    const basicValid =
      isValidPrice(newGig.basic?.price) && hasFeatures(newGig.basic);
    const standardValid =
      (!newGig.standard?.price && !hasFeatures(newGig.standard)) ||
      (isValidPrice(newGig.standard?.price) && hasFeatures(newGig.standard));
    const premiumValid =
      (!newGig.premium?.price && !hasFeatures(newGig.premium)) ||
      (isValidPrice(newGig.premium?.price) && hasFeatures(newGig.premium));

    if (!basicValid && standardValid && premiumValid) {
      return false;
    }

    try {
      await gigsModel.insertOne({
        sellerUsername: res.locals.jwt.username,
        sellerId: res.locals.jwt._id,
        title: newGig.title,
        category: {
          main: newGig.category?.main,
          sub: newGig.category?.sub,
        },
        tags: newGig.tags,
        description: newGig.description,
        basic: {
          price: isNaN(parseInt(newGig.basic?.price ?? ""))
            ? 0
            : parseInt(newGig.basic?.price ?? ""),
          delivery: newGig.basic?.delivery ?? "",
          features: newGig.basic?.features ?? [],
        },
        standard: {
          price: isNaN(parseInt(newGig.standard?.price ?? ""))
            ? 0
            : parseInt(newGig.standard?.price ?? ""),
          delivery: newGig.standard?.delivery ?? "",
          features: newGig.standard?.features ?? [],
        },
        premium: {
          price: isNaN(parseInt(newGig.premium?.price ?? ""))
            ? 0
            : parseInt(newGig.premium?.price ?? ""),
          delivery: newGig.premium?.delivery ?? "",
          features: newGig.premium?.features ?? [],
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
export default new GigController();
