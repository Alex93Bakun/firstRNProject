const asyncHandler = require('express-async-handler');
const Todo = require('../models/Todo.js');

// @route   GET /api/todos
const getTodos = asyncHandler(async (req, res) => {
	const todos = await Todo.find({}).sort({ createdAt: 'desc' }).exec()

	res.json(todos || [])
})

// @route   DELETE /api/todos/:id
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

// @route   POST /api/todos
const createTodo = asyncHandler(async (req, res) => {
	const { title } = req.body

	const todo = new Todo({
		title,
	})

	const createdTodo = await todo.save()
	res.status(201).json(createdTodo)
})

// @route   PUT /api/todos/:id
const updateTodo = asyncHandler(async (req, res) => {
	const { completed } = req.body

	const todo = await Todo.findById(req.params.id)

	if (todo) {
		todo.completed = completed

		await todo.save()
		res.json(true)
	} else {
		res.status(404)
		throw new Error('Task not found')
	}
})

module.exports = { getTodos, deleteTodo, createTodo, updateTodo }
