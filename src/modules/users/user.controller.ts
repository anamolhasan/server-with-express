import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";


const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
   const result = await userServices.createUser()
    // console.log(result.rows[0])
    res.status(201).json({
      success: false,
      message: "Data Inserted Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const userControllers = {
    createUser,
}