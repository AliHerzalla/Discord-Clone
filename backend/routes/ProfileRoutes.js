import { Router } from "express";
import {
  CreateUniqueProfile,
  getProfile,
  getUniqueProfile,
} from "../controllers/ProfileController.js";
const router = Router();

router.route("/get-unique-profile/:id").get(getUniqueProfile);
router.route("/get-profile/:id").get(getProfile);
router.route("/create-unique-profile").post(CreateUniqueProfile);

export default router;
