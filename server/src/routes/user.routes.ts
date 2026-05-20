import express from "express";

import {
  getSalesUsers,
} from "../controllers/user.controller";

import {
  protect,
} from "../middleware/auth.middleware";

import {
  authorizeRoles,
} from "../middleware/role.middleware";

const router =
  express.Router();

router.get(
  "/sales",

  protect,

  authorizeRoles("admin"),

  getSalesUsers
);



export default router;