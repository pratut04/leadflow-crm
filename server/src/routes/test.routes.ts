import express from "express";

import {
  protect,
} from "../middleware/auth.middleware";

import {
  authorizeRoles,
} from "../middleware/role.middleware";

const router = express.Router();

router.get(
  "/profile",

  protect,

  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

router.get(
  "/admin",

  protect,

  authorizeRoles("admin"),

  (req, res) => {
    res.json({
      success: true,
      message:
        "Welcome Admin",
    });
  }
);

export default router;