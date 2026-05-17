import type { Gig } from "../types/Gig.js";
import gigsModel from "../models/gigsModel.js";
import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
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
          `${createdGig._id}-${files.indexOf(file) + 1}`,
          "gigPreviewImages",
        );
        uploadedImages.push(resultUpload.secure_url);
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

  async getGigToReview(req: Request, res: Response) {
    const id = req.params.id;

    if (!res.locals.jwt?._id) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    if (!id)
      return res.status(400).json({ status: false, message: "No id provided" });

    if (!isValidObjectId(id)) {
      return res.status(400).json({ status: false, message: "Invalid gig id" });
    }

    try {
      const order = await orderModel.findOne({
        gigId: id,
        buyerId: res.locals.jwt._id,
      });
      if (!order)
        return res
          .status(404)
          .json({ status: false, message: "No order found" });
    } catch (error) {
      console.error(error);
    }

    try {
      const gig = await gigsModel.findById(id);
      return gig
        ? res.status(200).json(gig)
        : res.status(404).json({ status: false, message: "No gig was found" });
    } catch (error) {
      console.error(error);
    }
  }

  async reviewGig(req: Request, res: Response) {
    const { id, rating, comment } = req.body;

    if (!id)
      return res.status(400).json({ status: false, message: "No id provided" });

    if (!isValidObjectId(id)) {
      return res.status(400).json({ status: false, message: "Invalid gig id" });
    }

    if (!rating)
      return res
        .status(400)
        .json({ status: false, message: "No rating provided" });

    try {
      const order = await orderModel.findOne({
        gigId: id,
        buyerId: res.locals.jwt._id,
      });
      if (!order)
        return res
          .status(404)
          .json({ status: false, message: "No order found" });
    } catch (error) {
      console.error(error);
    }

    try {
      const gig = await gigsModel.findById(id);
      if (!gig)
        res.status(404).json({ status: false, message: "No gig was found" });

      const reviews = gig?.reviews || [];
      const avgRating =
        reviews.length > 0
          ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
            reviews.length
          : rating;

      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const createdAt = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;

      await gigsModel.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            reviews: {
              comment: comment,
              rating: rating,
              username: res.locals.jwt.username,
              createdAt: createdAt,
            },
          },
          $set: {
            rating: avgRating,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }

    return res
      .status(201)
      .json({ status: "success", message: "Review posted!" });
  }
}

export default new GigController();
