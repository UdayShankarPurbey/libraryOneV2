import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../models/student.models.js";
import mongoose, { Mongoose } from "mongoose";

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


export {
  registerStudent,
  getStudentsById,
  updateStudent,
  deleteStudent,
  loginStudent,
  logoutStudent,
}