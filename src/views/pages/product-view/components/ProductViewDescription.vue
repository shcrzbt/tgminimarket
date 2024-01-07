<script setup>
defineProps(["description"])
</script>

<template>
	<div class="product-view-description">
		<div class="product-view-description__title">Описание товара</div>
		<div class="product-view-description__content">{{ description }}</div>
	</div>
</template>

<style scoped lang="scss">


.product-view-description {
	@include flex(1.2rem, column, start, start);

	&__title {
		@include getFont('h4');
		font-weight: 500 !important;

		color: var(--gs-100);

	}

	&__content {
		@include getFont('p3');
		font-weight: 400 !important;

		color: var(--gs-200);
	}
}

</style>