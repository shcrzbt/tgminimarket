<script setup lang="js">

import usePage from "./usePage"

const {
	loading,
	product
} = usePage()

</script>

<template>
	<div class="product-detail-page">
		<van-swipe width="100%" class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item>1</van-swipe-item>
			<van-swipe-item>2</van-swipe-item>
			<van-swipe-item>3</van-swipe-item>
			<van-swipe-item>4</van-swipe-item>
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
.my-swipe .van-swipe-item {
	color: #fff;
	font-size: 20px;
	line-height: 150px;
	text-align: center;
	background-color: #39a9ed;
}
.my-swipe  {
	width: 100%;
}
</style>
