import { Router } from "express";
import { verifyLibrarianJWT, verifyStudentJWT } from "../middlewares/adminAuth.middlewares.js";
import { allocateBooks, allocateMaterial, deleteStudent, getStudentsById, loginStudent, logoutStudent, registerStudent, returnBooks, returnMaterial, updateStudent } from "../controllers/student.controllers.js";

const router = Router()

router.route("/loginStudent").post(loginStudent)
router.route("/logoutStudent").get(verifyStudentJWT,logoutStudent)

// router.route("/updateStudent").patch(verifyStudentJWT , updateStudent)


router.use(verifyLibrarianJWT)
router.route("/addStudent").post(registerStudent)
router.route("/getStudentById/:studentId").get(getStudentsById)
router.route("/updateStudent/:studentId").patch(updateStudent)
router.route("/deleteStudent/:studentId").delete(deleteStudent)

// Allocate Books and Material - For Student   -- Only Accessed By Librarian
router.route("/allocateBook/:studentId/:bookId").get(allocateBooks)
router.route("/returnBook/:studentId/:bookId").get(returnBooks)
router.route("/allocateMaterial/:studentId/:materialId").get(allocateMaterial);
router.route("/returnMaterial/:studentId/:materialId").get(returnMaterial)

export default router