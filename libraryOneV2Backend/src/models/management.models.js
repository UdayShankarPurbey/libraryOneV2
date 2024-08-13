import mongoose from "mongoose";

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
    role : {
      type : String,
      required : true,
      enum : ['administrator' , 'librarian' , 'teacher'],
    },
    refreshToken : {
     type : String,
    }
  },
  {
    timestamps: true,
  }
)

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
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
      }
      
  )
}

managementSchema.methods.generateRefreshToken =  function () {
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


export const Management = mongoose.model("Management", managementSchema);