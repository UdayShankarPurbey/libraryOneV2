import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../models/student.models.js";
import mongoose, { Mongoose } from "mongoose";
import { Book } from "../models/book.models.js";
import { Material } from "../models/material.models.js";

const registerStudent = asyncHandler(async (req, res) => {
  const {
    name,
    fatherName,
    motherName,
    localGuardian,
    imageUrl,
    gender,
    dateOfBirth,
    email,
    phone,
    session,
    address,
    password,
    regNo,
    rollNo,
    sec,
    batch
  } = req.body;

  console.log(req.body);

  if (
    [name, fatherName, motherName, gender, dateOfBirth, email, phone, address, imageUrl, password, regNo, rollNo, session, sec, batch].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  // Validate the date format and convert it
  let parsedDate;
  try {
    parsedDate = new Date(dateOfBirth);
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date");
    }
  } catch (error) {
    throw new ApiError(400, "Invalid date format. Please use YYYY-MM-DD.");
  }

  // Check if the user already exists
  const existedUser = await Student.findOne({
    $or: [{ email }, { phone }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // Create the new student entry
  const student = await Student.create({
    name,
    fatherName,
    motherName,
    localGuardian,
    imageUrl,
    gender,
    dateOfBirth: parsedDate,  // Use the parsed date here
    email,
    phone,
    address,
    password,
    session,
    regNo,
    rollNo,
    sec,
    batch,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Student registered successfully", student));
});

const getStudentsById = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  console.log(studentId);

  // Use the studentId directly
  const student = await Student.findById(studentId);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Student found", student));
});


const updateStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const { name, fatherName, motherName, localGuardian, imageUrl, gender, dateOfBirth, email, phone, address , password , sec   } = req.body;

  if(!(name || fatherName || motherName || localGuardian || imageUrl || gender || dateOfBirth || email || phone || address || password || sec)) {
    throw new ApiError(400, "Please provide at least one field to update");
  }

  const student = await Student.findByIdAndUpdate(studentId, {
    name,
    fatherName,
    motherName,
    localGuardian,
    imageUrl,
    gender,
    dateOfBirth,
    email,
    phone,
    address,
    password,
    sec,
  }, { new: true });

  if(!student) {
    throw new ApiError(404, "Student not found")
  }

  return res
 .status(200)
 .json(new ApiResponse(200, "Student updated successfully", student));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const deletedStudent = await Student.findByIdAndDelete(studentId);

  if(!deletedStudent) {
    throw new ApiError(404, "Student not found")
  }

  return res
  .status(200)
  .json(new ApiResponse(200, "Student deleted successfully", deletedStudent));
});

const  options = {
  httpOnly : true,
  secure : true
}

const loginStudent = asyncHandler(async (req, res) => {
  const { regNo, password } = req.body;
  if(!regNo ||!password) {
    throw new ApiError(400, "Please provide both regNo and password");
  }
  const student = await Student.findOne({ regNo });
  if(!student) {
    throw new ApiError(404, "Student not found");
  }
  const isPasswordValid = await student.isPasswordCorrect(password);
  if(!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }
  const accessToken = await student.generateAccessToken();

  if(!accessToken) {
    throw new ApiError(500, "Failed to generate access token ! Try After Sometime");
  }

  student.accessToken = accessToken;

  return res
 .status(200)
 .cookie("accessTokenStudent", accessToken ,options)
 .json(new ApiResponse(200, "Student logged in successfully", student));
});

const logoutStudent = asyncHandler(async (req, res) => {
  req.student = null;

  return res
  .status(200)
  .clearCookie("accessTokenStudent", options)
  .json(
      new ApiResponse(200 ,{}, "Student Logged Out Successfully")
  )
  
});


const allocateBooks = asyncHandler(async (req, res) => {
  const { studentId , bookId } = req.params;

  if (!studentId || !bookId) {
    throw new ApiError(400, "Please provide studentId and bookId");
  }

  const student = await Student.findById(studentId);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  const isValidForGettingBooksAndMaterial = student?.allocatedBooks?.length + student?.allocatedMaterial?.length

  if (isValidForGettingBooksAndMaterial >= 2) {
    throw new ApiError(400, "Student has already allocated maximum allowed books and materials")
  }

  if(student?.allocatedBooks?.find(b => b.bookId == bookId)) {
    throw new ApiError(400, "Student has already allocated this book");
  }

  const isBookAvailable = await Book.findById(bookId)

  if (!isBookAvailable) {
    throw new ApiError(404, "Book not found");
  }

  if(isBookAvailable?.quantity < 1) {
    throw new ApiError(400, "Book is not available for allocation");
  } 

  const studentBook = await Student.findByIdAndUpdate(
    studentId,
    { 
      $push: { 
        allocatedBooks: {
          bookId: isBookAvailable?._id,
          borrowDate : new Date(Date.now()),
          returnDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days 
        }
      } 
    },
    { new: true }
  ).select("-password")

  if(!studentBook) {
    throw new ApiError(500, "Something went wrong, unable to allocate book! Try again later.");
  }

  const book = await Book.findByIdAndUpdate(
    bookId,
    { $inc: { quantity: -1 } },
    { new: true }
  );

  if(!book) {
    const studentBook = await Student.findByIdAndUpdate(
      studentId,
      { 
        $pull: { 
          allocatedBooks: { bookId: bookId } // Remove book by its ID
        }
      },
      { new: true } // Return the updated document
    ).select("-password")

    throw new ApiError(500, "Something went wrong, unable to update book quantity! Try again later.");
  }

  return res
   .status(200)
   .json(
      new ApiResponse(200, {
        student: studentBook,
        book: book,
      }, "Book Allocated Successfully")
    );


});

const returnBooks = asyncHandler(async (req, res) => {
  const { studentId , bookId } = req.params;
  if (!studentId ||!bookId) {
    throw new ApiError(400, "Please provide studentId and bookId");
  }

  const student = await Student.findById(studentId);
  if (!student) {
    throw new ApiError(404, "Student not found");
  }
  
  const studentBook = student.allocatedBooks.find(b => b.bookId.toString() === bookId);
  if (!studentBook) {
    throw new ApiError(404, "Book not found for this student");
  }
  
  const book = await Book.findByIdAndUpdate(
    bookId,
    { $inc: { quantity: 1 } },
    { new: true }
  );
  if(!book) {
    throw new ApiError(500, "Something went wrong, unable to update book quantity! Try again later.");
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    studentId,
    {
      $pull: { allocatedBooks: { bookId: bookId } } // Remove book by its ID
    },
    { new: true } // Return the updated document
  ).select("-password");

  if(!updatedStudent) {
    const book = await Book.findByIdAndUpdate(
      bookId,
      { $inc: { quantity: -1 } },
      { new: true }
    );
    throw new ApiError(500, "Something went wrong, unable to return book! Try again later.");
  }
  
  return res
   .status(200)
   .json(
      new ApiResponse(200, {
        student: updatedStudent,
        book: book,
      }, "Book Returned Successfully"
    ));
});

const allocateMaterial = asyncHandler(async (req, res) => {
  const { studentId , materialId } = req.params;

  if (!studentId || !materialId) {
    throw new ApiError(400, "Please provide studentId and MaterialId");
  }

  const student = await Student.findById(studentId);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  const isValidForGettingBooksAndMaterial = student?.allocatedBooks?.length + student?.allocatedMaterial?.length

  if (isValidForGettingBooksAndMaterial >= 2) {
    throw new ApiError(400, "Student has already allocated maximum allowed books and materials")
  }

  if(student?.allocatedMaterial?.find(b => b.materialId == materialId)) {
    throw new ApiError(400, "Student has already allocated this Material");
  }

  const isMaterialAvailable = await Material.findById(materialId)

  if (!isMaterialAvailable) {
    throw new ApiError(404, "Material not found");
  }

  if(isMaterialAvailable?.quantity < 1) {
    throw new ApiError(400, "Material is not available for allocation");
  } 

  const studentMaterial = await Student.findByIdAndUpdate(
    studentId,
    { 
      $push: { 
        allocatedMaterial: {
          materialId : isMaterialAvailable?._id,
          borrowDate : new Date(Date.now()),
          returnDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days 
        }
      } 
    },
    { new: true }
  ).select("-password")

  if(!studentMaterial) {
    throw new ApiError(500, "Something went wrong, unable to allocate Material! Try again later.");
  }

  const material = await Material.findByIdAndUpdate(
    materialId,
    { $inc: { quantity: -1 } },
    { new: true }
  );

  if(!material) {
    const studentMaterial = await Student.findByIdAndUpdate(
      studentId,
      { 
        $pull: { 
          allocatedMaterial: { materialId: materialId } // Remove Material by its ID
        }
      },
      { new: true } // Return the updated document
    ).select("-password")

    throw new ApiError(500, "Something went wrong, unable to update Material quantity! Try again later.");
  }

  return res
   .status(200)
   .json(
      new ApiResponse(200, {
        student: studentMaterial,
        material : material,
      }, "Material Allocated Successfully")
    );


});

const returnMaterial = asyncHandler(async (req, res) => {
  const { studentId , materialId } = req.params;
  if (!studentId ||!materialId) {
    throw new ApiError(400, "Please provide studentId and materialId");
  }

  const student = await Student.findById(studentId);
  if (!student) {
    throw new ApiError(404, "Student not found");
  }
  
  const studentMaterial = student.allocatedMaterial.find(b => b.materialId.toString() === materialId);
  if (!studentMaterial) {
    throw new ApiError(404, "Material not found for this student");
  }
  
  const material = await Material.findByIdAndUpdate(
    materialId,
    { $inc: { quantity: 1 } },
    { new: true }
  );
  if(!material) {
    throw new ApiError(500, "Something went wrong, unable to update Material quantity! Try again later.");
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    studentId,
    {
      $pull: { allocatedMaterial: { materialId: materialId } } 
    },
    { new: true } // Return the updated document
  ).select("-password");

  if(!updatedStudent) {
    const material = await Material.findByIdAndUpdate(
      materialId,
      { $inc: { quantity: -1 } },
      { new: true }
    );
    throw new ApiError(500, "Something went wrong, unable to return Material ! Try again later.");
  }
  
  return res
   .status(200)
   .json(
      new ApiResponse(200, {
        student: updatedStudent,
        material: material,
      }, "Material Returned Successfully"
    ));
});



export {
  registerStudent,
  getStudentsById,
  updateStudent,
  deleteStudent,
  loginStudent,
  logoutStudent,

  // For Student - Book & Material Allocation
  allocateBooks,
  returnBooks,
  allocateMaterial,
  returnMaterial,
}