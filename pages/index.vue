<script setup lang="ts">
const { data, refresh } = await useFetch('/api/todo');

useSeoMeta({
	title: "NTodo",
	description: "Nuxt Todo Example"
})
</script>

<template>
	<div class="m-3">
		<TodoForm @saved="refresh" />
		<div class="my-5">
			<TodoList :todos="data" @updated="refresh" @deleted="refresh" />
		</div>
	</div>
</template>
