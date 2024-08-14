import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Management } from "../models/management.models.js";
import { managementType } from "../utils/typeEnum.js";

const  options = {
  httpOnly : true,
  secure : true
}


const addAdmin = asyncHandler(async (req, res) => {
  const { name, fatherName, motherName, gender, dateOfBirth, email, phone, address, password, imageUrl, role, productKey } = req.body;

  // Check for missing fields
  if (
    [name, fatherName, motherName, gender, dateOfBirth, email, phone, address, imageUrl, password, role].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  
  if (!productKey) {
    throw new ApiError(400, "Product key is required");
  }

  // Check if the role is valid
  if (!role == 'admin') {
    throw new ApiError(400, "Only for Admin Role");
  }
 
  if(! process.env.PRODUCT_KEY) {
    throw new ApiError(500, "Product key is not set in environment variables");
  }

  if (productKey !== process.env.PRODUCT_KEY) {
    throw new ApiError(400, "Invalid product key");
  }

  // Generate a new regNo
  const regNo = await Management.generateRegNo();

  // Check if the user already exists
  const existedUser = await Management.findOne({
    $or: [{ email }, { phone }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // Create the new management entry
  const management = await Management.create({
    name,
    fatherName,
    motherName,
    gender,
    dateOfBirth,
    email,
    phone,
    imageUrl,
    address,
    password,
    role,
    regNo
  });

  // Fetch the created management entry excluding sensitive information
  const createdManagement = await Management.findById(management._id).select('-password -refreshToken');

  if (!createdManagement) {
    throw new ApiError(500, "Something went wrong, unable to add to Management Data! Try again later.");
  }

  return res.status(201).json(
    new ApiResponse(200, createdManagement, "Added to Management Data Successfully")
  );
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if(!(email && password)) {
    throw new ApiError(400, "Please enter email and Password")
  }

  const admin = await Management.findOne({email})

  if(!admin ) {
    throw new ApiError(404, "Admin does not exist")
  }

  const isPasswordValid = await admin.isPasswordCorrect(password)

  if(!isPasswordValid) {
    throw new ApiError(401, "Invalid Admin Credentials")
  }

  if(admin.role !== 'admin') {
    throw new ApiError(403, "Unauthorized Access ! Only For Admin")
  }

  const accessToken = await admin.generateAccessToken()

  if(!accessToken) {
    throw new ApiError(500, "Something went wrong, unable to generate access token! Try again later.")
  }

  admin.accessToken = accessToken;

  const loggedInAdmin = await Management.findById(admin._id).select(" -password")

  return res
  .status(200)
  .cookie("accessTokenAdmin", accessToken ,options)
  .json(
      new ApiResponse(200 , {
          user : loggedInAdmin ,
          accessToken,
        } , "Admin Logged In Successfully")
  )

});

const logoutAdmin = asyncHandler(async (req, res) => {
  req.admin = null

  return res
  .status(200)
  .clearCookie("accessTokenAdmin", options)
  .json(
      new ApiResponse(200 ,{}, "Admin Logged Out Successfully")
  )

});

const updateAdmin = asyncHandler(async (req, res) => {
  const { name, fatherName, motherName, gender, dateOfBirth, email, phone, address, password, imageUrl } = req.body;

  if( !(name || fatherName || motherName || gender || dateOfBirth || email || phone || address || password || imageUrl)) {
    throw new ApiError(400, "Please fill the field You want to Update");
  }

  if(email || phone) {
    const existedAdmin = await Management.findOne({
      $or : [ { email } , { phone }]
    })
    // IMPROVE IT : OTP for changing Phone and email.

    if(existedAdmin) {
      throw new ApiError(409, "Emil or Phone Number is Already Registered  ! Try with another Email or Phone Number");
    }
  }

  const admin = await Management.findByIdAndUpdate(
    req?.admin?._id,
    {
      $set : {
        name,
        fatherName,
        motherName,
        gender,
        dateOfBirth,
        email,
        phone,
        address,
        password,
        imageUrl
      }
    },
    { 
      new : true
    }
  ).select("-password")

  return res
  .status(200)
  .json(
      new ApiResponse(200 , admin , "Admin Data Updated Successfully")
  ) 

});

const getAdmin = asyncHandler(async (req, res) => {
  const admin = await Management.findById(req?.admin?._id).select('-password');
  
  if(!admin) {
    throw new ApiError(404, "Admin not found");
  }
  
  return res.status(200).json(
    new ApiResponse(200, admin, "Admin Data Fetched Successfully")
  );
})

const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Management.findByIdAndDelete(req?.admin?._id);
  
  if(!admin) {
    throw new ApiError(404, "Admin not found");
  }

  res.admin = null;
  
  return res
  .status(200)
  .clearCookie("accessTokenAdmin", options)
  .json(
    new ApiResponse(200, {}, "Admin Data Deleted Successfully")
  );
});

const addInManagement = asyncHandler(async (req, res) => {
  const { name, fatherName, motherName, imageUrl, gender, dateOfBirth, email, phone, address, password, role } = req.body;

  // Check for missing fields
  if (
    [name, fatherName, motherName, imageUrl, gender, dateOfBirth, email, phone, address, password, role].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  // Check if the role is valid
  if (!managementType.includes(role)) {
    throw new ApiError(400, "Invalid management role");
  }

  if(role == "admin") {
    throw new ApiError(400, "Invalid management role");
  }

  // Generate a new regNo
  const regNo = await Management.generateRegNo();

  // Check if the user already exists
  const existedUser = await Management.findOne({
    $or: [{ email }, { phone } , { regNo }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // Create the new management entry
  const management = await Management.create({
    name,
    fatherName,
    motherName,
    imageUrl,
    gender,
    dateOfBirth,
    email,
    phone,
    address,
    password,
    role,
    regNo
  });

  // Fetch the created management entry excluding sensitive information
  const createdManagement = await Management.findById(management._id).select('-password');

  if (!createdManagement) {
    throw new ApiError(500, "Something went wrong, unable to add to Management Data! Try again later.");
  }

  return res.status(201).json(
    new ApiResponse(200, createdManagement, "Added to Management Data Successfully")
  );
});

const updateUserRole = asyncHandler(async (req , res) => {
  const { userId } = req.params;
  const { newRole } = req.body;

  if(!userId) {
    throw new ApiError(400, "Please provide userId");
  }

  if(!newRole) {
    throw new ApiError(400, "Please provide new role");
  }

  if (!managementType.includes(newRole)) {
    throw new ApiError(400, "Invalid management role");
  }

  if(newRole == 'admin') {
    throw new ApiError(400, "Invalid management role");
  }

  const userExists = await Management.findById(userId);
  if(!userExists) {
    throw new ApiError(404, "User not found");
  }

  if(userExists.role === newRole) {
    throw new ApiError(400, "User already has this role");
  }

  const user = await Management.findByIdAndUpdate(
    userId,
    {
      $set : {
        role : newRole
      }
    },
    { new : true }
  ).select("-password")

  return res
  .status(200)
  .json(
      new ApiResponse(200 , user , "User Role Updated Successfully")
  )
});

const getManagement = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if(!userId) {
    throw new ApiError(400, "Please provide userId");
  }
  
  const user = await Management.findById(userId).select('-password');
  
  if(!user) {
    throw new ApiError(404, "Management not found");
  }

  return res
  .status(200)
  .json(
      new ApiResponse(200, user, "Management Data Fetched Successfully")
  )
});

const deleteManagement = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  if(!userId) {
    throw new ApiError(400, "Please provide userId");
  }

  const user = await Management.findByIdAndDelete(userId);
  
  if(!user) {
    throw new ApiError(404, "User not found");
  }
  
  return res
  .status(200)
  .json(
      new ApiResponse(200, {}, "Management Data Deleted Successfully")
  )
});

const updateManagement = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { name, fatherName, motherName, imageUrl, gender, dateOfBirth, email, phone, address, password } = req.body;

  if( !(name || fatherName || motherName || gender || dateOfBirth || email || phone || address || password || imageUrl)) {
    throw new ApiError(400, "Please fill the field You want to Update");
  }

  const isValidUserId = await Management.findById(userId);
  
  if(!isValidUserId) {
    throw new ApiError(404, "User not found");
  }

  if(email || phone) {
    const existedUser = await Management.findOne({
      $or : [ { email } , { phone }]
    })
    // IMPROVE IT : OTP for changing Phone and email.

    if(existedUser) {
      throw new ApiError(409, "Emil or Phone Number is Already Registered  ! Try with another Email or Phone Number");
    }
  }

  const user = await Management.findByIdAndUpdate(
    userId,
    {
      $set : {
        name,
        fatherName,
        motherName,
        imageUrl,
        gender,
        dateOfBirth,
        email,
        phone,
        address,
        password
      }
    },
    { new : true }
  ).select('-password')
  
  return res
  .status(200)
  .json(
      new ApiResponse(200 , user , "Management Data Updated Successfully")
  )
});

const loginLibrarian = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if(!(email && password)) {
    throw new ApiError(400, "Please enter email and Password")
  }

  const librarian = await Management.findOne({email})

  if(!librarian ) {
    throw new ApiError(404, "Librarian does not exist")
  }

  const isPasswordValid = await librarian.isPasswordCorrect(password)

  if(!isPasswordValid) {
    throw new ApiError(401, "Invalid Librarian Credentials")
  }

  if(librarian.role !== 'librarian') {
    throw new ApiError(403, "Unauthorized Access !Only For Librarian")
  }

  const accessToken = await librarian.generateAccessToken()

  if(!accessToken) {
    throw new ApiError(500, "Something went wrong, unable to generate access token! Try again later.")
  }

  librarian.accessToken = accessToken;

  const loggedInLibrarian = await Management.findById(librarian._id).select(" -password")

  return res
  .status(200)
  .cookie("accessTokenLibrarian", accessToken ,options)
  .json(
      new ApiResponse(200 , {
          user : loggedInLibrarian ,
          accessToken,
        } , "Librarian Logged In Successfully")
  )
});

const logoutLibrarian = asyncHandler(async (req, res) => {
  req.librarian = null

  return res
  .status(200)
  .clearCookie("accessTokenLibrarian", options)
  .json(
      new ApiResponse(200 ,{}, "Librarian Logged Out Successfully")
  )
});

export { 
  // For admin role only
  addAdmin,  
  loginAdmin,
  logoutAdmin,
  updateAdmin,
  getAdmin,
  deleteAdmin,

  // For all roles
  addInManagement,
  getManagement,
  deleteManagement,
  updateManagement,
  updateUserRole,

  // For librarian role only
  loginLibrarian,
  logoutLibrarian,
};
