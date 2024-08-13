import mongoose from "mongoose";
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const studentSchema = new mongoose.Schema(
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
       localGuardian : {
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
        type : Date,
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
       rollNo : {
        type : String,
        required : true,
       },
       sec : {
        type : String,
        required : true,
       },
       batch : {
        type : String,
        required : true,
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
       refreshToken : {
        type : String,
       }
    },
    {
        timestamps: true
    }
)

studentSchema.pre('save',async function (next) {
    if(! this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10)
    next();
})

studentSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password)
}

studentSchema.methods.generateAccessToken = function () {
    return  jwt.sign(
        {
            _id : this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
        }
        
    )
}

studentSchema.methods.generateRefreshToken =  function () {
    return  jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
        }
        
    )
}

export const Student = mongoose.model("Student", studentSchema);