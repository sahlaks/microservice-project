import { IUser } from "../entities/User";
import { signupUser } from "../types/authUser";

export interface IAuthRepository {
findUserByEmail(email: string): Promise<IUser | null>
createUser(data: { username: string, email: string; password: string }): Promise<IUser | null>
}