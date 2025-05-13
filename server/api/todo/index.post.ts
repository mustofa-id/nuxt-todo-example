export default defineEventHandler(async (event) => {
	const body = await readBody<Todo>(event);

	if (body.id) {
		const existingIndex = todos.findIndex(t => t.id == body.id);
		if (existingIndex != -1) {
			todos[existingIndex] = body
			return
		}
	}

	const todo: Todo = {
		id: todos.length + 1,
		description: body.description,
		done: false,
	};
	todos.push(todo);
});
