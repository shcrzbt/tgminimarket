<script setup>
defineProps(["images"])
</script>

<template>
	<div class="product-view-thumb">
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

	//border-bottom: 1px solid var(--bg-secondary-3);
	//border-radius: 2.4rem;

	overflow: hidden;

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