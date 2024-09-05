import { Router } from "express";
import { addAdmin, addInManagement, allocateBooksMangement, allocateMaterialManagement, deleteAdmin, deleteManagement, getAdmin, getAllManagement, getManagement, loginAdmin, loginLibrarian, logoutAdmin, logoutLibrarian,  returnBooksManagement, returnMaterialManagement, updateAdmin, updateManagement, updateUserRole } from "../controllers/management.controllers.js";
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
router.route("/getAllManagement").get(verifyAdminJWT,getAllManagement)

// For Librarian Only
router.route("/loginLibrarian").post(loginLibrarian)
router.route("/logoutLibrarian").get(verifyLibrarianJWT,logoutLibrarian)

// Allocate Books and Material - For Student  -- Only Accessed By Librarian
router.use(verifyLibrarianJWT)
router.route("/allocateBook/:employeeId/:bookId").get(allocateBooksMangement)
router.route("/returnBook/:employeeId/:bookId").get(returnBooksManagement)
router.route("/allocateMaterial/:employeeId/:materialId").get(allocateMaterialManagement);
router.route("/returnMaterial/:employeeId/:materialId").get(returnMaterialManagement)


export default router