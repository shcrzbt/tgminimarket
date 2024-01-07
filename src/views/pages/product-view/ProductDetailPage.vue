<script setup lang="js">

import usePage from "./usePage"
import { computed } from "vue"
import ProductViewThumb from "@/views/pages/product-view/components/ProductViewThumb.vue"
import ProductViewDescription from "@/views/pages/product-view/components/ProductViewDescription.vue"
import ProductViewPrices from "@/views/pages/product-view/components/ProductViewPrices.vue"
import ProductViewTags from "@/views/pages/product-view/components/ProductViewTags.vue"

const {
	loading,
	product
} = usePage()

const tags = computed(() => {
	let tagsArray = []
	if (product.value.discounted_price) tagsArray.push({ title: "% Скидка" })

	tagsArray.push({ title: "Акция" })
	tagsArray.push({ title: "Распродажа" })
	tagsArray.push({ title: "Новинка" })
	return tagsArray
})
const images = computed(() => [product.value.image1, product.value.image2, product.value.image3])
</script>

<template>
	<div class="product-view-page">
		<product-view-thumb :images="images" />

		<div class="product-view-details">

			<div class="product-view-details__head">
				<div class="product-view-details__head-title">{{ product.name }}</div>
				<product-view-tags v-if="tags.length" :tags="tags" />


			</div>
			<product-view-prices :is-available="product.is_available" :sell-price="product.sell_price"
													 :price="product.price" :discount-price="product.discounted_price" />

			<product-view-description :description="product.description" />
		</div>
	</div>
</template>
<style lang="scss">
:root {
	--thumb-side-padding: 0rem;
	--side-padding: 2rem;
	--thumb-height: calc(100svw - var(--thumb-side-padding));
	--middle-gap: 0rem;
}

@media (min-width: 768px) {
	:root {
		--thumb-height: 76.8rem !important;
	}
}


//#app {
//	background-color: var(--bg-primary);
//}

</style>
<style scoped lang="scss">


.product-view-page {
	@include flex(var(--middle-gap), column, start, start);
	background-color: var(--bg-primary);
	overflow: hidden;
	width: 100%;
	//padding: 0 0 1.2rem 0;
	padding: 0 ;
}

.product-view {
	&-details {
		@include flex(2.4rem, column, start, start);

		min-height: calc(100svh - var(--thumb-height) + var(--middle-gap));
		background-color: var(--bg-secondary-4-lt-30);
		width: 100%;
		padding: 0 var(--side-padding) var(--side-padding);
		border-top: 1px solid var(--bg-secondary-4);
		border-radius: 2.4rem 2.4rem 0 0;
		box-shadow: 0px -4px 0px -35px rgb(0 0 0 / 10%), 0px -3px 6px 0px rgb(0 0 0 / 2%);
		&__head {
			@include flex(.8rem, column, start, start);
			margin-top: 2.4rem;
			--van-divider-margin: 0;

			&-title {
				@include getFont('h3');
				font-weight: 600 !important;
				color: var(--gs-100);
			}
		}

	}
}


</style>
