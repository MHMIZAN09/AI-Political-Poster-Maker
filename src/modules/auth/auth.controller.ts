import { Request, Response } from "express";
import { authService } from "./auth.service";


const register = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const user = await authService.register(payload);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: user,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
    });
  }
}


const login = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await authService.login(payload);
    const { accessToken, refreshToken, user } = result;



    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: {
        accessToken,
        refreshToken,
        user,
      },
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
    });
  }
}

export const authController = {
  register,
  login,
};
