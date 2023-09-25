import { Router } from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

import {
  createServer,
  findServerByUserId,
  findServerByServerId,
  findServerInfoByServerId,
  findUserInThatServer
} from "../controllers/ServerController.js";


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
  if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
    return cb(new Error("only upload files with jpg, jpeg, png, gif format."));
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
router.route("/find-unique-server-by-server-id/:id").post(findServerByServerId);
router.route("/find-server-info/:id").get(findServerInfoByServerId);
router.route("/find-user-in-that-server/:inviteCode").post(findUserInThatServer);
export default router;
