import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../../domain/entities/User";

const userSchema: Schema<IUser> = new mongoose.Schema({
    username:{type: String},
    email: {type: String},
    password: {type: String}
})
export const userModel: Model<IUser> = mongoose.model('User',userSchema)