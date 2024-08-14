import { Router } from "express";
import { addAdmin, addInManagement, deleteAdmin, deleteManagement, getAdmin, getManagement, loginAdmin, loginLibrarian, logoutAdmin, logoutLibrarian, updateAdmin, updateManagement, updateUserRole } from "../controllers/management.controllers.js";
import { verifyAdminJWT, verifyLibrarianJWT } from "../middlewares/adminAuth.middlewares.js";

const router = Router()

// For Admin Only 
router.route("/addAdmin").post(addAdmin)
router.route("/loginAdmin").post(loginAdmin)
router.route("/logoutAdmin").get(verifyAdminJWT,logoutAdmin)
router.route("/updateAdmin").patch(verifyAdminJWT,updateAdmin)
router.route("/getAdmin").get(verifyAdminJWT ,getAdmin)
router.route("/deleteAdmin").delete(verifyAdminJWT,deleteAdmin)

// For All Management
router.route("/addUserInManagement").post(verifyAdminJWT,addInManagement)
router.route("/updateUserAdmin/:userId").patch(verifyAdminJWT,updateUserRole)
router.route("/updateMangement/:userId").patch(verifyAdminJWT,updateManagement);
router.route("/getManagement/:userId").get(verifyAdminJWT,getManagement)
router.route("/deleteManagement/:userId").delete(verifyAdminJWT,deleteManagement)

// For Librarian Only
router.route("/loginLibrarian").post(loginLibrarian)
router.route("/logoutLibrarian").get(verifyLibrarianJWT,logoutLibrarian)

export default router