import { Router } from "express";
import {
  getProfileServers,
  CreateServer,
} from "../controllers/ServerController.js";
const router = Router();

router.route("/get-profile-servers/:id").get(getProfileServers);
router.route("/create-server").post(upload.single("Image"),CreateServer);

export default router;
