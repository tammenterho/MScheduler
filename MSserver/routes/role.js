// role.js
import express from "express";
import Role from "../models/Role.js";
import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from "../controllers/role.controller.js";

const router = express.Router();

// Create a new role to DB - logic in controller
router.post("/create", createRole);

//Update role in db - logic in controller
router.put("/update/:id", updateRole);

//Get all roles in db - logic in controller
router.get("/roles", getAllRoles);

//Delete role from db - logic in controller
router.delete("/deleteRole/:id", deleteRole);

export default router;
