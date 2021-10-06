import mongoose from 'mongoose'

// const { ObjectId } = mongoose.Schema

const todoSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		isChecked: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true,
	}
)

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
