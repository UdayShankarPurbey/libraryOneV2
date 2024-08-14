import { Router } from "express";
import { verifyLibrarianJWT, verifyStudentJWT } from "../middlewares/adminAuth.middlewares.js";
import { deleteStudent, getStudentsById, loginStudent, logoutStudent, registerStudent, updateStudent } from "../controllers/student.controllers.js";

const router = Router()
router.use(verifyLibrarianJWT)
router.route("/addStudent").post(registerStudent)
router.route("/getStudentById/:studentId").get(getStudentsById)
router.route("/updateStudent/:studentId").patch(updateStudent)
router.route("/deleteStudent/:studentId").delete(deleteStudent)

router.route("/loginStudent").post(loginStudent)
router.route("/logoutStudent").get(verifyStudentJWT,logoutStudent)


export default router