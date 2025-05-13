<script setup lang="ts">
const { data, refresh } = await useFetch('/api/todo');
</script>

<template>
	<div>
		<TodoForm @saved="refresh" />
		<TodoList :todos="data" @updated="refresh" />
	</div>
</template>
