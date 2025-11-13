import express from "express"
import { createBook, deleteBookFunc, fetchBook, fetchBooks, updateBookFunc } from "../controllers/book.controller"
import { createAuthorFunc, updateAuthorFunc } from "../controllers/author.controller"
import { createReviewFunc, deleteReviewFunc, updateReviewFunc } from "../controllers/review.controller"

export const router = express.Router()


/** ------- Book ------ */
router.post("/books", createBook)
router.get("/books", fetchBooks)
router.get("/book/:id", fetchBook)
router.put("/book/:id", updateBookFunc)
router.delete("/book/:id", deleteBookFunc)

/** ------- Author ------ */
router.post("/author", createAuthorFunc)
router.put("/author", updateAuthorFunc)


/** ------- Review ------ */
router.post("/review", createReviewFunc)
router.put("/review", updateReviewFunc)
router.delete("/review", deleteReviewFunc)