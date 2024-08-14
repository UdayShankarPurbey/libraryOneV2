import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { departmentTagType } from "../utils/typeEnum.js";
import { Book } from "../models/book.models.js";

const addBooks = asyncHandler(async (req, res) => {
  const {
    title,
    author,
    publicationYear,
    editionYear,
    quantity,
    genre,
    tag,
    price,
    description,
    bookCoverImage
  } = req.body;

  // Use 'or' (||) to check if any required field is missing
  if( !title && !author  && !quantity && !price ) {
    throw new ApiError(400, "Please provide all required fields");
  }

  // Initialize checkedTag as an empty array
  let checkedTag = [];

  if (tag) {
    tag.split(",").forEach((element) => {
      const trimmedTag = element.trim();
      const tagCheck = departmentTagType.includes(trimmedTag);
      if (!tagCheck) {
        throw new ApiError(400, `Invalid tag provided: ${element}`);
      }
      checkedTag.push(trimmedTag); // Push the valid element, not the check result
    });
  }

  // Check if a book with the same title and author already exists
  const existingBook = await Book.findOne({
    $and: [{ title }, { author }]
  });

  if (existingBook) {
    throw new ApiError(409, "Book with the same title and author already exists");
  }

  // Create the new book entry
  const newBook = await Book.create({
    title,
    author,
    publicationYear,
    editionYear,
    quantity,
    genre,
    tag: checkedTag,
    price,
    description,
    bookCoverImage
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Book added successfully", newBook));
});

const updateBooks = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { title, author, publicationYear, editionYear, quantity, genre, tag, price, description, bookCoverImage } = req.body;

  if(!(title || author  || publicationYear || editionYear || quantity || genre || tag || price || description || bookCoverImage)) {
    throw new ApiError(400, "Please provide Field you wnat to update");
  } 

  let checkedTag = [];


  if(tag) {
    tag.split(",")?.forEach(element => {
      const trimmedTag = element.trim();
      const tagCheck = departmentTagType.includes(trimmedTag)
      if(!tagCheck) {
        throw new ApiError(400, `Invalid tag provided: ${trimmedTag}`);
      }
      checkedTag.push(trimmedTag);
    });
  }

  const book = await Book.findByIdAndUpdate(
    bookId,
    {
      title,
      author,
      publicationYear,
      editionYear,
      quantity,
      genre,
      tag: checkedTag,
      price,
      description,
      bookCoverImage
    },
    { new: true }
  )
  

  return res
   .status(200)
   .json(new ApiResponse(200, "Book updated successfully", book));

});

const deleteBooks = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findByIdAndDelete(bookId);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  return res
   .status(200)
   .json(new ApiResponse(200, "Book deleted successfully", book));
});

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  if (!books) {
    throw new ApiError(404, "No books found");
  }
  return res
   .status(200)
   .json(new ApiResponse(200, "Books fetched successfully", books));
});

const getBookById = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  return res
   .status(200)
   .json(new ApiResponse(200, "Book fetched successfully", book));
});


export {
  addBooks,
  updateBooks,
  deleteBooks,
  getAllBooks,
  getBookById,
};
  