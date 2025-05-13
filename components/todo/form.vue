<script setup lang="ts">
const emit = defineEmits<{
	(event: 'saved'): Promise<void> | void,
	(event: 'deleted'): Promise<void> | void,
}>()

const toast = useToast()
const { todo = <Todo>{} } = defineProps<{ todo?: Todo }>()

async function saveTodo(e: Event) {
	await $fetch('/api/todo', {
		method: 'POST',
		body: todo,
	});
	if (!todo.id) (e.target as HTMLFormElement).reset();
	await emit('saved');

	toast.add({
		title: 'Succeed',
		description: `Todo saved successfully`,
		color: 'success'
	})
}

async function deleteTodo(todo: Todo) {
	const yes = confirm(`Delete "${todo.description}". Are you sure?`);
	if (!yes) return;

	await $fetch('/api/todo', {
		method: 'DELETE',
		body: todo,
	})
	await emit('deleted');

	toast.add({
		title: 'Succeed',
		description: `Todo deleted successfully`,
		color: 'info'
	})
}
</script>

<template>
	<form class="flex gap-1 items-center" action="/api/todo" method="post" @submit.prevent="saveTodo">
		<input name="id" :value="todo.id" hidden>
		<UInput name="description" v-model="todo.description" autocomplete="off" spellcheck="false" required />
		<UCheckbox v-if="todo.id" name="done" title="Mark as done" v-model="todo.done" />
		<UButton type="submit">{{ todo.id ? 'Save' : 'Add' }}</UButton>
		<UButton v-if="todo.id" color="error" type="button" @click="deleteTodo(todo)">Delete</UButton>
	</form>
</template>
