import { Types } from "mongoose";
import { ILike } from "../../domain/entities/like";
import { ILikeRepository } from "../../domain/interface/ILikeRepository";
import { likeModel } from "../model/likeModel";

export class LikeRepository implements ILikeRepository {

    async checkIfLiked(projectId: string, userId: string): Promise<boolean> {
        const exist = await likeModel.exists({ projectId, userId });
        console.log(exist);
        
        return !!exist;
    }
    
    async countLikes(projectId: string): Promise<number> {
          return likeModel.countDocuments({ projectId });
    }

    async findByProjectAndUser(projectId: string, userId: string): Promise<ILike | null> {
        return await likeModel.findOne({ projectId, userId });
    } 

    async deleteById(id: string): Promise<ILike | null> {
         return likeModel.findByIdAndDelete(id);
    }

    async createLike(projectId: string, userId: string): Promise<ILike> {
        return likeModel.create({projectId, userId})
    }
}