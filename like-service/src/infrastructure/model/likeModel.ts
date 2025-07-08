import mongoose, { Model, Schema, Types } from "mongoose";
import { ILike } from "../../domain/entities/like";
import { Mode } from "node:fs";

const likeSchema: Schema<ILike> = new Schema({
     userId:{ type:String, required: true},
      projectId: { type:String, required: true}
    },
    {
        timestamps: true
    }
)

likeSchema.index({ userId: 1, projectId: 1 }, { unique: true });
export const likeModel: Model<ILike> = mongoose.model('Like',likeSchema)
