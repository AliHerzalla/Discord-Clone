import { Router } from "express";
import { findAllMembers } from "../controllers/MemberController.js";
const router = Router();




router.route("/getAllMembers").get(findAllMembers);

export default router;
