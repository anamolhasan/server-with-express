import express from 'express'
import { todoController } from './todo.controller'


const router = express.Router()

router.post('/',todoController.createTodos)
router.get('/', todoController.getTodos)
router.get('/:id', todoController.getSingleTodos)
router.put('/:id', todoController.updateTodos)
router.delete('/:id', todoController.deleteTodos)



export const todoRoutes = router