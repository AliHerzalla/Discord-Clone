import { Router } from "express";
import {
  CreateUniqueProfile,
  getProfileServers,
  getUniqueProfile,
} from "../controllers/ProfileController.js";
const router = Router();

router.route("/get-unique-profile/:id").get(getUniqueProfile);
router.route("/get-profile-servers/:id").get(getProfileServers);
router.route("/create-unique-profile").post(CreateUniqueProfile);

export default router;
