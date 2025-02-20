import { Request, Response } from "express";
import prisma from "../../db/prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { getProfileImage } from "../utils/getProfileImage.js";
import { handleError } from "../utils/handleError.js";


const findUserByUsername = async (username: string) => {
    return await prisma.user.findUnique({
      where: { username },
    });
  };

const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await findUserByUsername(username);

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profileImage: string = getProfileImage(gender, username);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        gender,
        profileImage,
      },
    });

    if (!newUser) {

      return res.status(400).json({ error: "Couldn't create a new user" });
    }

    generateToken(newUser.id, res);

    res.status(200).json({
      id: newUser.id,
      fullName: newUser.fullName,
      username: newUser.username,
      profileImage: newUser.profileImage,
    });
  } catch (err: any) {
    console.log("Error in signup controller: ", err.message);
    handleError(res, err);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profileImage: user.profileImage,
    });
  } catch (error: any) {
    console.log("Error in login controller: ", error.message);
    handleError(res, error);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 0,
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    console.log("Error in logout controller: ", error.message);
    handleError(res, error);
  }
};


const getUser = async (req: Request, res: Response) => {
  try {

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id /*в protectRoute переопределили глобально объект Request добавили свойство user*/
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const { id, fullName, username, profileImage, ...rest } = user;

    res.status(200).json({
        id,
        fullName,
        username,
        profileImage
    });

  } catch (error: any) {

    console.log("Error in getUser controller: ", error.message);
    handleError(res, error);
  }
};
const authController = {
  signup,
  login,
  logout,
  getUser
};

export default authController;
