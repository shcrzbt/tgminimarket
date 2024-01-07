<script setup>
import { ref } from "vue"

defineProps(["images"])

const isFavorite = ref(false)
</script>

<template>
	<div class="product-view-thumb">
		<div class="product-view-thumb__buttons">
			<div class="product-view-thumb__buttons-left"></div>
			<div class="product-view-thumb__buttons-right">
				<van-button @click="isFavorite = !isFavorite" size="large" :icon="isFavorite ? 'like':'like-o'" class="product-view-thumb__button"
										:class="{'product-view-thumb__button--checked': isFavorite}" round type="success"></van-button>
<!--				<van-button size="large" icon="share" class="product-view-thumb__button" round type="success"></van-button>-->
			</div>
		</div>
		<van-swipe class="product-view-thumb__carousel" indicator-color="var(--gs-100)" lazy-render>
			<van-swipe-item v-for="img in images">
				<van-image fit="contain" width="100%" height="100%" :src="img" />
			</van-swipe-item>

			<template #indicator="{ active, total }">
				<div class="swipe-custom-indicator">{{ active + 1 }} / {{ total }}</div>
			</template>
		</van-swipe>
	</div>
</template>

<style scoped lang="scss">


.product-view-thumb {
	--van-image-placeholder-background: var(--bg-primary);
	--van-image-loading-icon-size: 6.4rem;

	width: 100%;
	height: var(--thumb-height);
	background-color: var(--bg-primary);
	position: relative;
	//border-bottom: 1px solid var(--bg-secondary-3);
	//border-radius: 2.4rem;

	overflow: hidden;

	&__button {
		--van-button-icon-size: 2.4rem !important;

		padding: 0;
		width: 4.8rem;
		height: 4.8rem;

		background-color: var(--bg-secondary);
		color: var(--main-secondary-2);
		border: none;

		&--checked:first-of-type {
			color: var(--pink);
		}
	}

	&__buttons {
		@include flex(.8rem, row, space-between, center);
		width: 100%;
		padding: var(--side-padding) var(--side-padding) 0;

	}

	&__buttons-right {
		@include flex(.8rem, row, space-between, center);

	}

	&__carousel {
		width: 100%;
		height: 100%;

		.swipe-custom-indicator {
			@include getFont('p4');
			position: absolute;
			right: var(--side-padding);
			bottom: var(--side-padding);
			padding: .2rem 0;
			font-size: 1rem !important;
			white-space: nowrap;
			background-color: var(--gs-400);
			color: var(--main-secondary-2);
			text-align: center;
			border-radius: .6rem;
			width: 3.6rem;
		}
	}
}

</style>