import { REGISTRATION } from "../constants/messages";
import { IAuthRepository } from "../domain/interface/IAuthRepository";
import { loginUser, signupUser } from "../domain/types/authUser";
import { generateToken } from "../infrastructure/jwtCreation";
import { checkPasswordMatch, generatePassword } from "../infrastructure/utils/password";

export class AuthUseCase {
  constructor(private authRepository: IAuthRepository) {}

  //@ signup logic
  async createUser(data: signupUser) {
    //check if user exist
    const existingUser = await this.authRepository.findUserByEmail(data.email);
    if (existingUser)
      return { status: false, message: REGISTRATION.USER_EXISTS };
    const hashedPassword = await generatePassword(data.password);
    const userData = {
      username: data.username.trim(),
      email: data.email.trim().toLowerCase(),
      password: hashedPassword,
    };
    //save user
    const saved = await this.authRepository.createUser(userData);
    if (!saved) {
      return { status: false, message: REGISTRATION.ERROR };
    }

    const accessToken = generateToken(saved._id);
    return {
      status: true,
      message: REGISTRATION.USER_CREATED,
      accessToken,
    };
  }

  //@login logic
  async loginUser(credetials: loginUser) {
    const result = await this.authRepository.findUserByEmail(credetials.email);
    if(!result) {
        return { status: false, message: REGISTRATION.NOT_EXIST}
    }
     const isPasswordCorrect = await checkPasswordMatch(credetials.password, result.password);
     if(!isPasswordCorrect) {
        return {status: false, message: REGISTRATION.WRONG_PASSWORD}
     }
    const accessToken = generateToken(result._id);
    return {
      status: true,
      message: REGISTRATION.USER_VALID,
      accessToken,
    };
  }
}
