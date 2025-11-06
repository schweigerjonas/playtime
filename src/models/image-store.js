import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};
cloudinary.config(credentials);

export const imageStore = {
  getAllImages: async function () {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function (imageFile) {
    writeFileSync("./public/images/tmp.img", imageFile);
    const response = await cloudinary.v2.uploader.upload("./public/images/tmp.img");
    return {
      url: response.url,
      publicId: response.public_id,
    };
  },

  deleteImage: async function (img) {
    await cloudinary.v2.uploader.destroy(img, {});
  },
};
