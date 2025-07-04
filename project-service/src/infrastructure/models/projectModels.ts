import mongoose, { Model, Schema } from "mongoose";
import { IProject } from "../../domain/entities/Project";

const projectSchema: Schema<IProject> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: false },
    createdBy:{type: String, required: true}
  },
  {
    timestamps: true,
  }
);
export const projectModel: Model<IProject> = mongoose.model("Project",projectSchema)