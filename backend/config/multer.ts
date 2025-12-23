import multer from "multer";
import cloudinary from "./cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "college-events",
    resource_type: "image",

    
    format: "webp",

    
    transformation: [
      {
        quality: "auto:eco",   
        fetch_format: "auto",
      },
    ],

    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});


 
const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, 
  },

  fileFilter(req, file, cb) {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

export default upload;

