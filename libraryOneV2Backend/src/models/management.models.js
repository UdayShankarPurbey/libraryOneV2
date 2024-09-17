import mongoose from "mongoose";
import { managementType } from "../utils/typeEnum.js";
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const managementSchema = new mongoose.Schema(
  {
    name : {
     type : String,
     required : true,
    },
    fatherName : {
     type : String,
     required : true,
    },
    motherName : {
     type : String,
     required : true,
    },
    imageUrl : {
     type : String,
     required : true,
    },
    gender : {
     type : String,
     required : true,
    },
    dateOfBirth : {
     type : String,
     required : true,
    },
    email : {
     type : String,
     required : true,
     unique : true,
    },
    phone : {
     type : String,
     required : true,
     unique : true,
    },
    address : {
     type : String,
     required : true,
    },
    password : {
     type : String,
     required : true,
    },
    regNo : {
     type : String,
     required : true,
     unique : true,
    },
    role : {
      type : String,
      required : true,
      enum : managementType,
    },
    allocatedBooks : [
      {
          bookId : {
              type : mongoose.Schema.Types.ObjectId,
              ref : 'Book',
          },
          borrowDate : {
              type : Date,
          },
          returnDate : {
              type : Date,
          },
      }
     ],
     allocatedMaterial : [
      {
        materialId : {
              type : mongoose.Schema.Types.ObjectId,
              ref : 'Journal_Article_Other',
          },
          borrowDate : {
              type : Date,
          },
          returnDate : {
              type : Date,
          },
      }
     ],
  },
  {
    timestamps: true,
  }
)

// Static method to generate regNo
managementSchema.statics.generateRegNo = async function () {
  let count = await this.countDocuments();
  count = count > 20 ? count : count *10;
  const random= Math.floor(Math.random()*count);
  // Generate regNo based on the count. Adjust the format as needed.
  return `GIET${count + 1}${random}`; 
};

managementSchema.pre('save',async function (next) {
  if(! this.isModified('password')){
      return next();
  }
  this.password = await bcrypt.hash(this.password,10)
  next();
})

managementSchema.methods.isPasswordCorrect = async function (password) {
 return await bcrypt.compare(password, this.password)
}

managementSchema.methods.generateAccessToken = function () {
  return  jwt.sign(
      {
          _id : this._id,
      },
      process.env.ADMIN_ACCESS_TOKEN_SECRET,
      {
          expiresIn : process.env.ADMIN_ACCESS_TOKEN_EXPIRY,
      }
      
  )
}

export const Management = mongoose.model("Management", managementSchema);