import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

// =====================
// CONFIG
// =====================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export function uploadBuffer(buffer: Buffer, publicId: string) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        overwrite: true,
        invalidate: true,
        folder: "profilePictures",
        format: "webp",

        transformation: {
          width: 1200,
          height: 1200,
          crop: "limit",
          quality: "auto:good",
        },

        strip: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
}

export function getOptimizedImage(publicId: string) {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
  });
}

export function getSquareImage(publicId: string, version?: number, size = 500) {
  return cloudinary.url(publicId, {
    version,
    width: size,
    height: size,
    crop: "fill",
    gravity: "auto",
    fetch_format: "auto",
    quality: "auto",
  });
}
