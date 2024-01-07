<script setup>
defineProps(["tags"])
</script>

<template>
	<div class="product-card__thumb-tags">
		<div class="product-card__thumb-tag" v-for="(tag, i) in tags" :key="`thumb-tag-${i}`">
			<component v-if="tag.hasOwnProperty('render')" :is="tag.render" />
			<span v-else >{{ tag.title }}</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.product-card__thumb {
	&-tags {
		@include flex(.4rem, row, start, center);
		position: absolute;
		bottom: .8rem;
		left: .8rem;
	}

	&-tag {
		@include getFont('p4');
		font-size: 1rem !important;
		padding: 0 .4rem;
		background-color: var(--main-secondary);
		color: var(--bg-primary);
		border-radius: .6rem;

	}
}
</style>