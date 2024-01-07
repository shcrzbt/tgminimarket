<script setup lang="js">

import usePage from "./usePage"

const {
	loading,
	product
} = usePage()

</script>

<template>
	<div class="product-detail-page">
		<div class="product-detail__thumb">
			<van-swipe class="product-detail__thumb-carousel" indicator-color="var(--gs-100)" lazy-render>
				<van-swipe-item v-for="img in 3">
					<van-image fit="contain" width="100%" height="100%" :src="product['image'+img]" />
				</van-swipe-item>
				<template #indicator="{ active, total }">
					<div class="swipe-custom-indicator">{{ active + 1 }} / {{ total }}</div>
				</template>
			</van-swipe>
		</div>

	</div>
</template>

<style lang="scss">

.product-detail-page {
	@include flex(.8rem, column, start, start);
	overflow: hidden;
	width: 100%;
	padding: 0 0 8px 0;
}

.product-detail {
	&__thumb {
		--van-image-placeholder-background: var(--bg-secondary-2);
		--van-image-loading-icon-size: 6.4rem;
		width: 100%;
		height: 60svh;
		background-color: var(--bg-primary);

		&-carousel {
			width: 100%;
			height: 100%;
		}

		:deep(.van-swipe__indicators) {
			right: 1.2rem;
			left: unset !important;
		}
	}
}

.swipe-custom-indicator {
	@include getFont('p4');
	position: absolute;
	right: 1.2rem;
	bottom: 1.2rem;
	padding: .2rem 0;
	font-size: 1rem !important;
	white-space: nowrap;
	background-color: var(--gs-400);
	color: var(--main-secondary-2);
	text-align: center;
	border-radius: .6rem;
	width: 3.6rem;
}
</style>
