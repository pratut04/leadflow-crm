import express from "express";

import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
  addLeadNote,
  deleteLeadNote,
  assignLead,
} from "../controllers/lead.controller";

import {
  protect,
} from "../middleware/auth.middleware";

import {
  authorizeRoles,
} from "../middleware/role.middleware";

const router = express.Router();

router.post(
  "/",
  protect,
  createLead
);

router.get(
  "/",
  protect,
  getLeads
);

router.get(
  "/:id",
  protect,
  getLeadById
);

router.put(
  "/:id",
  protect,
  updateLead
);

router.delete(
  "/:id",

  protect,

  authorizeRoles("admin"),

  deleteLead
);

router.post(
  "/:id/notes",

  protect,

  addLeadNote
);

router.delete(
  "/:id/notes/:noteId",

  protect,

  authorizeRoles("admin"),

  deleteLeadNote
);

router.put(
  "/assign/:id",
  protect,
  authorizeRoles("admin"),
  assignLead
);


export default router;