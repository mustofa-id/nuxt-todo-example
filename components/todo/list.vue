<script setup lang="ts">
const emit = defineEmits<{ (event: 'updated'): Promise<void> | void, (event: 'deleted'): Promise<void> | void }>()
const { todos } = defineProps<{ todos: Todo[] | null }>()
</script>

<template>
	<ol>
		<li class="my-2" v-for="todo in todos" :key="todo.id">
			<TodoForm :todo="todo" @saved="emit('updated')" @deleted="emit('deleted')" />
		</li>
	</ol>
</template>
