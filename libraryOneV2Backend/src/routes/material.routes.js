import { Router } from "express";
import { verifyLibrarianJWT } from "../middlewares/adminAuth.middlewares.js";
import { addMaterial, deleteMaterial, getAllMaterials, getMaterialById, updateMaterial } from "../controllers/material.controllers.js";

const router = Router()
router.use(verifyLibrarianJWT)
router.route("/addMaterial").post(addMaterial)
router.route("/getMaterial").get(getAllMaterials)
router.route("/getMaterialById/:materialId").get(getMaterialById)
router.route("/updateMaterial/:materialId").patch(updateMaterial)
router.route("/deleteMaterial/:materialId").delete(deleteMaterial)

export default router