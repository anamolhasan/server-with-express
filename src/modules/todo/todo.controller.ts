import { Request, Response } from "express";
import { todoService } from "./todo.service";


const createTodos = async (req: Request, res: Response) => {
  // const { user_id, title } = req.body;

  try {
    const result = await todoService.createTodo(req.body)

    res.status(200).json({
      success: true,
      message: "todo insert successfully added",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoService.getTodo()

    res.status(201).json({
      success: false,
      message: "todos retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const getSingleTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoService.getSingleTodo(req.params.id as string)

    // console.log(result.rowCount )
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(201).json({
        success: false,
        message: "todo single successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const updateTodos = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await todoService.updateTodo(user_id, title, req.params.id!)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "todos not found",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "todos update successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const deleteTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoService.deleteTodo(req.params.id!)

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "todos not found",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "todos delete successfully",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const todoController = {
  createTodos,
  getTodos,
  getSingleTodos,
  updateTodos,
  deleteTodos
}