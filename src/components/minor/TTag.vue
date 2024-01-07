<script setup>
defineProps(["tag"])
</script>

<template>
	<div class="t-tag">
		<component v-if="tag.hasOwnProperty('render')" :is="tag.render" />
		<span v-else>{{ tag.title }}</span>
	</div>
</template>

<style scoped lang="scss">
.t-tag {
	@include getFont('p4');

	font-weight: 200 !important;
	border: 1px solid var(--main-secondary-lt-20);
	padding: .2rem .8rem;
	border-radius: .8rem;
	white-space: nowrap;
	//@include getFont('p4');
	//font-size: 1rem !important;
	//padding: 0 .4rem;
	background-color: var(--main-secondary-lt-20);
	color: var(--main-secondary);
}
</style>