<script setup lang="js">
import usePage from "./UsePage"
import ProductItem from "@/components/ProductItem.vue"
import BackToTop from "@/components/BackToTop.vue"
import ProductListCategories from "@/components/ProductListCategories.vue"
import ProductListCategoryTags from "@/components/ProductListCategoryTags.vue"
import { useWindowScroll } from "@vueuse/core"
import ProductListSearch from "@/components/ProductListSearch.vue"

const { x, y } = useWindowScroll()

const {
	loading,
	selectedProductsCount,
	selectedProductIds,
	filters,
	products,
	showCatPicker,
	onListLoad,
	searchProducts,
	onCategoryFilter,
	loadFinished,
	onSubmitFilter
} = usePage()


const cartHidden = true
</script>

<template>
	<div class="product-list-page">
		<transition name="van-slide-down">
			<product-list-category-tags v-if="y > 180"  v-model:category="filters.category" @update:category="onCategoryFilter" />
		</transition>

		<ProductListSearch v-model:search="filters.search" v-model:price="filters.price" v-model:category="filters.category"
											 @filter="onSubmitFilter" @search-products="searchProducts" />

		<div class="product-list-page__body">

			<ProductListCategories v-model:category="filters.category" @update:category="onCategoryFilter" />

			<!--			<div v-if="!products.length && loading" class="loading-wrapper">-->
			<!--				<van-loading size="24px">Загрузка...</van-loading>-->
			<!--			</div>-->
			<van-empty v-if="loadFinished && !loading && !products.length" style="width: 100%" description="Упс!   Похоже что товаров нет..." />
			<van-list
				v-else
				v-model:loading="loading"
				:finished="loadFinished"
				finished-text="Вы посмотрели все..."
				@load="onListLoad"
				style="width:100%"
			>
				<!--			<div class="product-list" :class="{ 'action-button-shown': showActionButton }">-->
				<div class="product-list">
					<div class="filters"></div>


					<van-grid :gutter="12" :column-num="2">
						<product-item v-for="(product, index) in products" :key="product.id+'prod'" :product="product"
													:index="index" />
					</van-grid>
				</div>
			</van-list>

		</div>
		<back-to-top />

	</div>
</template>

<style lang="scss">
.product-list-page {
	width: 100%;

	&__body {
		@include flex(.8rem, column, start, start);

		width: 100%;
		padding: 0 0 8px 0;
	}
}

.loading-wrapper {
	@include flex(0, row, center, center);

	height: 100%;
}

:root {
	--van-radius-sm: 8px;
	--van-search-input-height: 44px !important;
	--van-search-input-height: 44px !important;
}


.product-list {
	transition: all 0.3s ease-out;

	.van-grid-item__content {
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
