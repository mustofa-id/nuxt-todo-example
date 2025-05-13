<script setup lang="ts">
const emit = defineEmits<{ (event: 'updated'): Promise<void> | void }>()
const { todos } = defineProps<{ todos: Todo[] | null }>()
</script>

<template>
	<ol>
		<li v-for="todo in todos" :key="todo.id">
			<TodoForm :todo="todo" @saved="async () => await emit('updated')" />
		</li>
	</ol>
</template>
