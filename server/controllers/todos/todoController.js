import asyncHandler from 'express-async-handler'
import Todo from '../../models/todo/todoModel.js'

// @desc    Get all todos
// @route   GET /api/todos
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
	const todos = await Todo.find({}).sort({ createdAt: 'desc' }).exec()

	res.json(todos || [])
})

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
	const todo = await Todo.findById(req.params.id)

	if (todo) {
		await todo.remove()
		res.json({ message: 'Task deleted' })
	} else {
		res.status(404)
		throw new Error('Task not found')
	}
})

// @desc    Create todo
// @route   POST /api/todos
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
	const { title } = req.body

	const todo = new Todo({
		title,
	})

	const createdTodo = await todo.save()
	res.status(201).json(createdTodo)
})

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
	const { isChecked } = req.body

	const todo = await Todo.findById(req.params.id)

	if (todo) {
		todo.isChecked = isChecked

		await todo.save()
		res.json(true)
	} else {
		res.status(404)
		throw new Error('Task not found')
	}
})

export { getTodos, deleteTodo, createTodo, updateTodo }
