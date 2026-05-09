import router from "express";
import { upload } from "../../utils/multer";
import { uploadBuffer, getSquareImage } from "../../services/Cloudinary";
import userModel from "../models/userModel";
export const uploadRouter = router();

uploadRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = req.file?.buffer;

    if (!fileBuffer) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result: any = await uploadBuffer(
      fileBuffer,
      res.locals.jwt.username + "-profilePicture",
    );


    const url = getSquareImage(result.public_id, result.version);


    await userModel.updateOne(
      { _id: res.locals.jwt._id },
      {
        $set: {
          profilePictureUrl: url
        },
      },
    );

    res.send(url);
  } catch (err) {
    res.status(500).json(err);
  }
});
