import express from "express";

import {
  getSalesUsers,
   changePassword,
    updateProfile,
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

router.put(
  "/change-password",
  protect,
  changePassword
);
router.put(
  "/profile",
  protect,
  updateProfile
);


export default router;
