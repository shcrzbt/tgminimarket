<script setup lang="js">

import usePage from "./usePage"

const {
	loading,
	product
} = usePage()

</script>

<template>
	<div class="product-detail-page">
		<van-swipe :autoplay="3000" width="768" >
			<van-swipe-item :key="product.id">
				<img :src="product.image1" />
			</van-swipe-item>
			<van-swipe-item :key="product.id">
				<img :src="product.image2" />
			</van-swipe-item>
			<van-swipe-item :key="product.id">
				<img :src="product.image3" />
			</van-swipe-item>
		</van-swipe>


	</div>
</template>

<style lang="scss">

.product-detail-page {
	@include flex(.8rem, column, start, start);
	overflow: hidden;
	width: 100%;
	padding: 0 0 8px 0;
}

</style>
