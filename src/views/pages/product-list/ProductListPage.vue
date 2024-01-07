<script setup lang="js">

import usePage from "./usePage"
import ProductListCategories from "@/components/ProductListCategories.vue"
import ProductListCategoryTags from "@/components/ProductListCategoryTags.vue"
import { useWindowScroll } from "@vueuse/core"
import { ref } from "vue"
import ProductCard from "@/modules/product-card"

const { x, y } = useWindowScroll()
const activeTabBar = ref(0)
const {
	loading,
	filters,
	products,
	onListLoad,
	searchProducts,
	onCategoryFilter,
	loadFinished,
	showProduct
} = usePage()


const cartHidden = true
</script>

<template>
	<div class="product-list-page">
		<transition name="van-slide-down">
			<product-list-category-tags v-if="y > 180" v-model:category="filters.category"
																	@update:category="onCategoryFilter" />
		</transition>

		<div class="product-list-page__body">

			<ProductListCategories v-model:category="filters.category" @update:category="onCategoryFilter" />

			<van-empty v-if="loadFinished && !loading.products && !products.length" style="width: 100%"
								 description="Упс!   Похоже что товаров нет..." />
			<van-list
				v-else
				v-model:loading="loading.products"
				:finished="loadFinished"
				finished-text="Вы посмотрели все..."
				@load="onListLoad"
				style="width:100%"
			>
				<div class="product-list">
					<van-grid :gutter="12" :column-num="2">
						<van-grid-item v-for="(product, index) in products" :key="product.id+'prod'">
							<product-card @click="showProduct(product.id)" :product="product"
														:index="index"></product-card>
						</van-grid-item>
					</van-grid>
				</div>

			</van-list>

		</div>


		<van-tabbar v-if="false" v-model="activeTabBar" active-color="var(--main-secondary)" inactive-color="#91969B">
			<van-tabbar-item :to="{name:'product.list'}">
				<span>Главная</span>
				<template #icon="props">
					<van-icon v-if="props.active" name="wap-home"></van-icon>
					<van-icon v-else name="wap-home-o"></van-icon>
				</template>
			</van-tabbar-item>

			<van-tabbar-item @click.prevent icon="search">Каталог</van-tabbar-item>

			<van-tabbar-item @click.prevent>
				<span>Корзина</span>
				<template #icon="props">
					<van-icon v-if="props.active" name="shopping-cart"></van-icon>
					<van-icon v-else name="shopping-cart-o"></van-icon>
				</template>
			</van-tabbar-item>

			<van-tabbar-item @click.prevent>
				<span>Избранное</span>
				<template #icon="props">
					<van-icon v-if="props.active" name="like"></van-icon>
					<van-icon v-else name="like-o"></van-icon>
				</template>
			</van-tabbar-item>

			<van-tabbar-item @click.prevent>
				<span>Профиль</span>
				<template #icon="props">
					<van-icon v-if="props.active" name="user"></van-icon>
					<van-icon v-else name="user-o"></van-icon>
				</template>
			</van-tabbar-item>

		</van-tabbar>
	</div>
</template>

<style lang="scss">
.van-tabbar {
	border-radius: 1rem 1rem 0 0;
	padding: 0.4rem 0 1.2rem 0;
	box-shadow: var(--shadow-2);
}

.van-tabbar-item__text {
	font-size: 12px;
	font-weight: 300;
}

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
