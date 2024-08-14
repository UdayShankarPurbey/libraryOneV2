import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Material } from "../models/material.models.js";
import { materialType } from "../utils/typeEnum.js";

const addMaterial = asyncHandler(async (req, res) => {
  const { title , author , publicationYear , editionYear , quantity , genre , type , price ,  description , coverImage } = req.body;

  if(!title &&  !quantity && !price) {
    throw new ApiError(400, "Please Fill Required Field ");
  }

  if(type) {
    if(!materialType.includes(type.trim())) {
      throw new ApiError(400, `Invalid Material Type ${type.trim()}`);
    }
  }

  const material = await Material.create({
    title,
    author,
    publicationYear,
    editionYear,
    quantity,
    genre,
    type,
    price,
    description,
    coverImage,
  });

  return res
  .status(200)
  .json(new ApiResponse(200, "Material added successfully", material));

});

const getAllMaterials = asyncHandler(async (req, res) => {
  const materials = await Material.find({});
  if(!materials) {
    throw new ApiError(404, "No Materials Found");
  }
  return res
  .status(200)
  .json(new ApiResponse(200, "All Materials Fetched Successfully", materials));
});

const getMaterialById = asyncHandler(async (req, res) => {
  const { materialId } = req.params;
  const material = await Material.findById(materialId);
  if(!material) {
    throw new ApiError(404, "Material Not Found");
  }
  return res
  .status(200)
  .json(new ApiResponse(200, "Material Fetched Successfully", material));
});

const updateMaterial = asyncHandler(async (req, res) => {
  const { materialId } = req.params;
  const { title , author , publicationYear , editionYear , quantity , genre , type , price ,  description , coverImage } = req.body;

  if(! (title || author || publicationYear || editionYear || quantity || genre || type || price || description || coverImage)) {
    throw new ApiError(400, "Please provide Field you wnat to update");
  }

  const material = await Material.findByIdAndUpdate(materialId, {
    $set: {
      title,
      author,
      publicationYear,
      editionYear,
      quantity,
      genre,
      type,
      price,
      description,
      coverImage,
    },
  }, { new: true });

  if(!material) {
    throw new ApiError(404, "Material Not Found");
  }

  return res
 .status(200)
 .json(new ApiResponse(200, "Material Updated Successfully", material));  

});

const deleteMaterial = asyncHandler(async (req, res) => {
  const { materialId } = req.params;
  const material = await Material.findByIdAndDelete(materialId);
  if(!material) {
    throw new ApiError(404, "Material Not Found");
  }
  return res
  .status(200)
  .json(new ApiResponse(200, "Material Deleted Successfully", material));

});

export {
  addMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
}