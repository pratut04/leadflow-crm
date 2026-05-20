import express from "express";

import authRoutes from "./auth.routes";
import testRoutes from "./test.routes";
import leadRoutes from "./lead.routes";
import userRoutes from "./user.routes";
const router = express.Router();

router.use(
  "/auth",
  authRoutes
);

router.use(
  "/test",
  testRoutes
);

router.use(
  "/leads",
  leadRoutes
);

router.use(
  "/users",
  userRoutes
);

export default router;