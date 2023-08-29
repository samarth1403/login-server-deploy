import mongoose from "mongoose";
export const validateMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return { message: "ID is not found or not valid" };
  }
};
