import { Document } from "mongoose";

export interface IProject extends Document {
  _id: string;
  createdBy:string;
  title: string;
  description: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}
