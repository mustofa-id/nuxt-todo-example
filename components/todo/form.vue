<script setup lang="ts">
const emit = defineEmits<{
	(event: 'saved'): Promise<void> | void
}>()

const { todo = <Todo>{} } = defineProps<{ todo?: Todo }>()

async function saveTodo(e: Event) {
	await $fetch('/api/todo', {
		method: 'POST',
		body: todo
	});
	if (!todo.id) (e.target as HTMLFormElement).reset();
	await emit('saved');
}
</script>

<template>
	<form action="/api/todo" method="post" @submit.prevent="saveTodo">
		<input name="id" :value="todo.id" hidden>
		<input name="description" v-model="todo.description" autocomplete="off" spellcheck="false" required>
		<input v-if="todo.id" type="checkbox" name="done" title="Mark as done" v-model="todo.done">
		<button>{{ todo.id ? 'Save' : 'Add' }}</button>
	</form>
</template>
