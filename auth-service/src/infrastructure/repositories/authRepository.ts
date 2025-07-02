import { IUser } from "../../domain/entities/User";
import { IAuthRepository } from "../../domain/interface/IAuthRepository";
import { userModel } from "../models/userModels";

export class AuthRepository implements IAuthRepository {
  /*..........................exist or nnot.......................*/
  async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await userModel.findOne({ email });
    return user;
  }

  /*...........................save user.............................*/
  async createUser(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<IUser | null> {
    const savedUser = await userModel.create(data);
    return savedUser;
  }
}
