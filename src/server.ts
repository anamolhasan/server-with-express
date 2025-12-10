import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/users/user.routes";

const app = express();
const port = config.port;

// initializing DB
initDB();

// parser
app.use(express.json());
// app.use(express.urlencoded())


app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World! Bangladesh");
});

// USER CURD OPERATION
app.use('/users', userRoutes)

// users single GET method
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM users WHERE id = $1
      `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// users PUT method
app.put("/users/:id", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `
      UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
      [name, email, req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// users single DELETE method
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM users WHERE id = $1
      `,
      [req.params.id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Todos CURD operation
// todo POST Method
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO todos(user_id, title) VAlUES ($1,$2) RETURNING *`,
      [user_id, title]
    );

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
});
// todos GET method
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM todos
      `);

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
});
// todos single GET method
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM todos WHERE id = $1
      `,
      [req.params.id]
    );

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
});
// todos PUT method
app.put("/todos/:id", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(
      `
      UPDATE todos SET user_id = $1, title = $2 WHERE id=$3 RETURNING *
      `,
      [user_id, title, req.params.id]
    );

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
});
// todos DELETE method
app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
        DELETE FROM todos WHERE id = $1
        `,
      [req.params.id]
    );

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
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening  http://localhost:${port}`);
});
