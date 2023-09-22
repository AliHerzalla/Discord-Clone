import { Router } from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

import { createServer, findServerByUserId } from "../controllers/ServerController.js";
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
    return cb(new Error("only upload files with jpg, jpeg, png format."));
  }
  cb(undefined, true); // continue with upload
};

const upload = multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
  storage,
  fileFilter,
  // preservePath:true,
});

router.route("/create-server").post(upload.single("Image"), createServer);
router.route("/find-server-by-userId/:id").get(findServerByUserId);
export default router;
