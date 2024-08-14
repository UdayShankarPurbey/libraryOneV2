import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Management } from "../models/management.models.js";

export const verifyAdminJWT = asyncHandler(async(req , _ ,next) => {
  try {
    const token = req.cookies?.accessTokenAdmin || req.header("Authorization")?.replace("Bearer ", "")
 
    if(!token) {
     throw new ApiError(401 , " Unauthorized access token")
    }
 
    const decodedToken = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET)
 
    const admin = await Management.findById(decodedToken?._id).select("-password")
 
    if(!admin ) {
        throw new ApiError(401 , " Unauthorized access token")
    }    
    req.admin = admin;
    next();
  } catch (error) {
   throw new ApiError(401 , error?.message || "Invalid access token");
  }
})

export const verifyLibrarianJWT = asyncHandler(async(req , _ ,next) => {
  try {
    const token = req.cookies?.accessTokenLibrarian || req.header("Authorization")?.replace("Bearer ", "")
 
    if(!token) {
     throw new ApiError(401 , " Unauthorized access token")
    }
 
    const decodedToken = jwt.verify(token, process.env.LIBRARIAN_ACCESS_TOKEN_SECRET)
 
    const librarian = await Management.findById(decodedToken?._id).select("-password")
 
    if(!librarian ) {
        throw new ApiError(401 , " Unauthorized access token")
    }    
    req.librarian = librarian;
    next();
  } catch (error) {
   throw new ApiError(401 , error?.message || "Invalid access token");
  }
})
