import express from 'express'
import * as todos from '../../controllers/todos/todoController.js'
const router = express.Router()

router.route('/').get(todos.getTodos).post(todos.createTodo)
router.route('/:id').delete(todos.deleteTodo).put(todos.updateTodo)

export default router
