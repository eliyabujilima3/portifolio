import { Router } from "express";
import {
  login,
  listMessages,
  getStats,
  updateMessage,
  removeMessage,
  exportCsv,
} from "../controllers/admin.controller";
import { requireAdmin } from "../middleware/auth";
import { loginLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/login", loginLimiter, login);

router.use(requireAdmin);
router.get("/messages", listMessages);
router.get("/messages/stats", getStats);
router.get("/messages/export", exportCsv);
router.patch("/messages/:id", updateMessage);
router.delete("/messages/:id", removeMessage);

export default router;
