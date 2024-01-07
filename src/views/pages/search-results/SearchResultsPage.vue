<script setup>
import usePage from "@/views/pages/search-results/usePage"
import ProductCard from "@/modules/product-card"

const {
	loading,
	products,
	onListLoad,
	searchValue,
	searchProducts,
	showProduct,
	loadFinished
} = usePage()



</script>

<template>
	<div class="search-results-page">
		<van-empty v-if="searchValue && loadFinished && !loading.main && !loading.scroll && !products.length" style="width: 100%"
							 description="Ничего не найдено" />
		<van-list
			v-else
			v-model:loading="loading.scroll"
			:finished="loadFinished"
			@load="onListLoad"
			style="width:100%"
		>
			<!--			<div class="product-list" :class="{ 'action-button-shown': showActionButton }">-->
			<div class="search-results-list">

				<van-grid :gutter="12" :column-num="2">
					<van-grid-item v-for="(product, index) in products" :key="product.id+'prod'">
						<product-card @click="showProduct(product.id)"  :product="product" :index="index"></product-card>
					</van-grid-item>
				</van-grid>

			</div>

		</van-list>
	</div>
</template>

<style scoped lang="scss">
.search-results-page {
	@include flex(.8rem, column, start, start);

	width: 100%;
	margin-top: 7rem;
	padding: 1.2rem 0;
}

.search-results-list {
	transition: all 0.3s ease-out;

	:deep(.van-grid-item__content) {
		@include flex(.8rem, column, start, start);
		background-color: transparent;
		padding: 0;
		position: relative;


		&:after {
			display: none;
		}
	}
}
</style>