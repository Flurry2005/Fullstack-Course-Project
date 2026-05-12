import type { Gig } from "../types/Gig.js";
import gigsModel from "../models/gigsModel.js";
import { Request, Response, NextFunction } from "express";
import { categories } from "../utils/Categories.js";
import orderModel from "../models/orderModel.js";
import { getSquareImage, uploadBuffer } from "../services/Cloudinary.js";

class GigController {
  async getGigs() {
    try {
      return await gigsModel.find().select("-sellerId").lean();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getGigById(req: Request) {
    try {
      return await gigsModel.findById(req.params.id).select("-sellerId").lean();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getGigToEdit(req: Request, res: Response) {
    try {
      return await gigsModel.findOne({
        _id: req.params.id,
        sellerId: res.locals.jwt._id,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getGigsBySellerUsername(req: Request) {
    const username = req.params.username;
    if (!username) return false;

    try {
      // Used by public profile pages where the route only knows the seller username.
      return await gigsModel
        .find({ sellerUsername: username })
        .select("-sellerId")
        .lean();
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async createGig(req: Request, res: Response, next: NextFunction) {
    const newGig: Gig = JSON.parse(req.body.gig);

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

    // finds corresponding slug to category and sub category
    const mainCategory = categories.find(
      (cat) => cat.main.name === newGig.category!.main,
    );
    const subCategory = mainCategory?.subs.find(
      (sub) => sub.sub === newGig.category!.sub,
    );

    const mainSlug = mainCategory?.main.slug
      ? mainCategory?.main.slug
      : categories[0].main.slug;
    const subSlug = subCategory?.sub_slug
      ? subCategory?.sub_slug
      : categories[0].subs[0].sub_slug;

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
      const parsePrice = (val: any) => {
        const n = Number(val);
        return isNaN(n) ? 0 : n;
      };
      const stdFeatures = newGig.standard?.features ?? [];
      const premFeatures = newGig.premium?.features ?? [];
      const createdGig = await gigsModel.create({
        sellerUsername: res.locals.jwt.username,
        sellerId: res.locals.jwt._id,
        title: newGig.title,
        category: {
          main: newGig.category?.main,
          sub: newGig.category?.sub,
          main_slug: mainSlug,
          sub_slug: subSlug,
        },
        tags: newGig.tags,
        description: newGig.description,
        basic: {
          price: parsePrice(newGig.basic?.price),
          delivery: newGig.basic?.delivery ?? "",
          features: newGig.basic?.features ?? [],
        },
        standard: {
          price:
            stdFeatures.length === 0 ? 0 : parsePrice(newGig.standard?.price),
          delivery: newGig.standard?.delivery ?? "",
          features: stdFeatures,
        },
        premium: {
          price:
            premFeatures.length === 0 ? 0 : parsePrice(newGig.premium?.price),
          delivery: newGig.premium?.delivery ?? "",
          features: premFeatures,
        },
        pending: true,
      });

      //@ts-ignore
      const files = req.files as Express.Multer.File[];

      const uploadedImages: string[] = [];

      for (const file of files) {
        const resultUpload: any = await uploadBuffer(
          file.buffer,
          `${createdGig._id}-${crypto.randomUUID()}`,
          "gigPreviewImages",
        );

        uploadedImages.push(
          getSquareImage(resultUpload.public_id, resultUpload.version),
        );
      }

      await gigsModel.updateOne(
        { _id: createdGig._id },
        {
          $set: {
            primaryImagePreview: uploadedImages[0] ?? null,
            secondaryImagePreview: uploadedImages[1] ?? null,
            ternaryImagePreview: uploadedImages[2] ?? null,
          },
        },
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateGig(req: Request, res: Response, next: NextFunction) {
    const updatedGig: Gig = req.body;

    console.log(updatedGig);
    if (
      !updatedGig.title ||
      !updatedGig.category?.main ||
      !updatedGig.category?.sub ||
      !updatedGig.description ||
      !updatedGig.tags
    ) {
      return false;
    }

    // finds corresponding slug to category and sub category
    const mainCategory = categories.find(
      (cat) => cat.main.name === updatedGig.category!.main,
    );
    const subCategory = mainCategory?.subs.find(
      (sub) => sub.sub === updatedGig.category!.sub,
    );

    const mainSlug = mainCategory?.main.slug
      ? mainCategory?.main.slug
      : categories[0].main.slug;
    const subSlug = subCategory?.sub_slug
      ? subCategory?.sub_slug
      : categories[0].subs[0].sub_slug;

    const isValidPrice = (price: any) =>
      price && !Number.isNaN(parseInt(price));
    const hasFeatures = (pkg: any) =>
      Array.isArray(pkg?.features) && pkg.features.length > 0;

    const basicValid =
      isValidPrice(updatedGig.basic?.price) && hasFeatures(updatedGig.basic);
    const standardValid =
      (!updatedGig.standard?.price && !hasFeatures(updatedGig.standard)) ||
      (isValidPrice(updatedGig.standard?.price) &&
        hasFeatures(updatedGig.standard));
    const premiumValid =
      (!updatedGig.premium?.price && !hasFeatures(updatedGig.premium)) ||
      (isValidPrice(updatedGig.premium?.price) &&
        hasFeatures(updatedGig.premium));

    if (!basicValid && standardValid && premiumValid) {
      return false;
    }

    try {
      const parsePrice = (val: any) => {
        const n = Number(val);
        return isNaN(n) ? 0 : n;
      };
      const stdFeatures = updatedGig.standard?.features ?? [];
      const premFeatures = updatedGig.premium?.features ?? [];
      const targetGig = await gigsModel.findOneAndUpdate(
        { _id: updatedGig._id, sellerId: res.locals.jwt._id },
        {
          $set: {
            sellerUsername: res.locals.jwt.username,
            sellerId: res.locals.jwt._id,
            title: updatedGig.title,
            category: {
              main: updatedGig.category?.main,
              sub: updatedGig.category?.sub,
              main_slug: mainSlug,
              sub_slug: subSlug,
            },
            tags: updatedGig.tags,
            description: updatedGig.description,
            basic: {
              price: parsePrice(updatedGig.basic?.price),
              delivery: updatedGig.basic?.delivery ?? "",
              features: updatedGig.basic?.features ?? [],
            },
            standard: {
              price:
                stdFeatures.length === 0
                  ? 0
                  : parsePrice(updatedGig.standard?.price),
              delivery: updatedGig.standard?.delivery ?? "",
              features: stdFeatures,
            },
            premium: {
              price:
                premFeatures.length === 0
                  ? 0
                  : parsePrice(updatedGig.premium?.price),
              delivery: updatedGig.premium?.delivery ?? "",
              features: premFeatures,
            },
            pending: true,
          },
        },
      );

      if (!targetGig) return false;

      await orderModel.updateMany(
        { sellerId: res.locals.jwt._id, gigId: updatedGig._id },
        {
          $set: {
            gigname: updatedGig.title,
          },
        },
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteGig(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "No id provided" });
    }

    try {
      const deletedGig = await gigsModel.findOneAndDelete({
        _id: id,
        sellerId: res.locals.jwt._id,
      });
      if (!deletedGig) return false;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
export default new GigController();
