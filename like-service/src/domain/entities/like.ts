import mongoose, { Document } from "mongoose";

export interface ILike extends Document {
  _id: string;
  userId: string;
  projectId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
