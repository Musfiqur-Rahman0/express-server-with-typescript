import type { NextFunction, Request, Response } from "express";
import { userService } from "../user/user.service";
import { profileService } from "./profile.service";
import sendResponse from "../../utility/sendResponse";

const createProfile = async (
  req: Request,
  res: Response,
  Next: NextFunction,
) => {
  // console.log(req.body);
  try {
    // console.log("on try");
    const result = await profileService.createUserProfileInDB(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Created a new profile ",
      data: result.rows[0],
    });
  } catch (error: any) {
    Next(error);
  }
};

export const profileController = {
  createProfile,
};
