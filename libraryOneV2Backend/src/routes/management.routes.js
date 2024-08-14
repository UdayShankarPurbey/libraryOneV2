import { Router } from "express";
import { addAdmin, addInManagement, loginAdmin, logoutAdmin, updateAdmin, updateUserRole } from "../controllers/management.controllers.js";
import { verifyAdminJWT } from "../middlewares/adminAuth.middlewares.js";

const router = Router()

// For Admin Only 
router.route("/addAdmin").post(addAdmin)
router.route("/loginAdmin").post(loginAdmin)
router.route("/logoutAdmin").get(verifyAdminJWT,logoutAdmin)
router.route("/updateAdmin").post(verifyAdminJWT,updateAdmin)
router.route("/updateUserAdmin").post(verifyAdminJWT,updateUserRole)


// For All Management
router.route("/addUserInManagement").post(addInManagement)



export default router