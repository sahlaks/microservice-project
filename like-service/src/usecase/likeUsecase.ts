import { ILikeRepository } from "../domain/interface/ILikeRepository";

export class LikeUseCase {
  constructor(private likeRepository: ILikeRepository) {}

  async countLikes(projectId: string) {
     const count = await this.likeRepository.countLikes(projectId);
    return { count };
  }

  async checkIfLiked(projectId: string, userId: string) {
    const exists = await this.likeRepository.checkIfLiked(projectId, userId);
    return { liked: exists };
  }

  async toggleLike(projectId: string, userId: string) {
    const existingLike = await this.likeRepository.findByProjectAndUser(
      projectId,
      userId
    );
    if (existingLike) {
      await this.likeRepository.deleteById(existingLike._id);
      return { liked: false,pId: projectId };
    }
    await this.likeRepository.createLike(projectId, userId);
    return { liked: true, pId: projectId };
  }
}
