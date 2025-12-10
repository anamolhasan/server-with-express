import express from 'express'
import { todoController } from './todo.controller'


const router = express.Router()

router.post('/',todoController.createTodos)
router.get('/', todoController.getTodos)
router.get('/:id', todoController.getSingleTodo)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)



export const todoRoutes = router