export default defineEventHandler(async (event) => {
	const body = await readBody<Todo>(event);

	if (body.id) {
		const existingIndex = todos.findIndex(t => t.id == body.id);
		if (existingIndex != -1) {
			todos.splice(existingIndex, 1)
		}
	}
});
