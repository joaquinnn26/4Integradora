import { Router } from "express";

import {  findUserById,documentMulter, findUserByEmail, createUser, changeRole } from "../controllers/users.controller.js";
import upload from "../middlewares/multer.middleware.js";
const router = Router();

router.get(
  "/:idUser", findUserById);

router.post("/premium/:idUser",changeRole)
router.post("/:idUser/documents",upload.fields([
  { name: "dni", maxCount: 1 },
  { name: "address", maxCount: 1 },
  { name: "bank", maxCount: 1 },
]),documentMulter)

router.post("/", async (req, res) => {
  const user = req.body
  const createdUser = await createUser(user)
  res.json({ createdUser })
})


export default router;