import mongoose from "mongoose";
import { ILike } from "../entities/like";

export interface ILikeRepository{
    checkIfLiked(projectId: string, userId: string): Promise<boolean>
    countLikes(projectId: string): Promise<number>
    findByProjectAndUser(projectId: string,userId:string): Promise<ILike | null>
    deleteById(id: string): Promise<ILike | null>
    createLike(projectId: string, userId: string): Promise<ILike>
}