<script setup lang="js">
import usePage from "./UsePage"
import ProductListFilter from "@/components/ProductListFilter.vue"
import ProductItem from "@/components/ProductItem.vue"
import BackToTop from "@/components/BackToTop.vue"

const {
	loading,
	selectedProductsCount,
	selectedProductIds,
	filters,
	products,
	showCatPicker,
	onListLoad,
	searchProducts,
	loadFinished,
	onSubmitFilter
} = usePage()


const cartHidden = true
</script>

<template>
	<div>
		<ProductListFilter v-model:search="filters.search" v-model:price="filters.price" v-model:category="filters.category"
											 @filter="onSubmitFilter" @search-products="searchProducts" />


		<div v-if="!products.length && loading" class="loading-wrapper">
			<van-loading size="24px">Загрузка...</van-loading>
		</div>

		<van-list
			v-model:loading="loading"
			:finished="loadFinished"
			finished-text="Вы посмотрели все..."
			@load="onListLoad"
		>

<!--			<div class="product-list" :class="{ 'action-button-shown': showActionButton }">-->
			<div class="product-list" :class="{ 'action-button-shown': showActionButton }">
				<div class="filters"></div>


				<van-grid :gutter="12" :column-num="2">
					<product-item v-for="(product, index) in products" :key="product.id+'prod'" :product="product" :index="index" />
				</van-grid>
			</div>
		</van-list>


		<back-to-top />

	</div>
</template>

<style lang="scss">

.loading-wrapper {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.van-slider__button {
	position: relative;

	&::after {
		content: attr(data-value);
		position: absolute;
		top: -30%;
		padding: 0 8px;
		line-height: normal;
		background-color: #7a7a7a71;
		border-radius: 16px;
		box-shadow: var(--van-slider-button-shadow);
	}
}

.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateY(30px);
	opacity: 0;
}

:root {
	--van-radius-sm: 8px;
	--van-search-input-height: 44px !important;
	--van-search-input-height: 44px !important;
}

.van-search__action {
	line-height: normal !important;
}

.product-list {
	padding-top: 80px;
	padding-bottom: 8px;
	transition: all 0.3s ease-out;

	.van-grid-item__content {
		background-color: var(--van-search-content-background);
		justify-content: start;
		border-radius: 12px !important;
		gap: 8px;
		padding-top: 8px;
		align-items: start;
		position: relative;
		padding-bottom: 8px;
		box-shadow: var(--van-calendar-header-shadow);

		&:after {
			border-radius: 26px !important;
		}
	}
}
</style>
