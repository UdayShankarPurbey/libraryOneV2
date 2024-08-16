import { Router } from "express";
import { verifyLibrarianJWT } from "../middlewares/adminAuth.middlewares.js";
import { addBooks, deleteBooks, getAllBooks, getBookById, updateBooks } from "../controllers/book.controllers.js";

const router = Router()

router.use(verifyLibrarianJWT)
router.route("/addBook").post(addBooks)
router.route("/updateBook/:bookId").patch(updateBooks)
router.route("/deleteBook/:bookId").delete(deleteBooks)
router.route("/getBook/:bookId").get(getBookById)
router.route("/getAllBooks").get(getAllBooks)

// routter.route("/allocateBooks").post()
export default router