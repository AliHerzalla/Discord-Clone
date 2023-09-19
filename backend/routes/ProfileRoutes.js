import { Router } from "express";
import {
  CreateUniqueProfile,
  getUniqueProfile,
} from "../controllers/ProfileController.js";
const router = Router();

router.route("/get-unique-profile/:id").get(getUniqueProfile);
router.route("/create-unique-profile").post(CreateUniqueProfile);

export default router;
