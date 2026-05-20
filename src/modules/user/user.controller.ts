import type { NextFunction, Request, Response } from "express";

import { userService } from "./user.service";
import sendResponse from "../../utility/sendResponse";

const createUser = async (req: Request, res: Response, Next: NextFunction) => {
  //   const { name, email, password, age } = req.body;

  try {
    const result = await userService.createUserIntoDB(req.body);

    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Failed to create a user",
      });

      return;
    }

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    if (error.code === "23505") {
      sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Email already in use.",
        error: error,
      });
    } else {
      Next(error);
    }
  }
};

const getAllUser = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    const result = await userService.getAllUsersFromDB();
    // console.log(result.rows);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User retrived sucessfully",
      data: result.rows,
    });
  } catch (error: any) {
    Next(error);
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  Next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const result = await userService.getSingleUserFromDB(id as string);
    // console.log(result.rows[0]);
    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found!",
      });
    } else {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User retrived successfully ",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    Next(error);
  }
};

const updateUser = async (req: Request, res: Response, Next: NextFunction) => {
  const { id } = req.params;
  //   const { name, password } = req.body;
  try {
    const result = await userService.updateUserFromDB(req.body, id as string);

    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found",
        data: {},
      });
    } else {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "user updated sucessfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    Next(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserFromDB(id as string);

    if (result.rows.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "User not found", data: {} });
    } else {
      res.status(200).json({
        success: true,
        message: "user deleted successfully",
        data: {},
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
