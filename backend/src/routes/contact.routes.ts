import { Router } from "express";
import { submitContact } from "../controllers/contact.controller";
import { contactLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/", contactLimiter, submitContact);

export default router;
