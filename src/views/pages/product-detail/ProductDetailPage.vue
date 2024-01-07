<script setup lang="js">

import usePage from "./usePage"
import { computed } from "vue"
import TTag from "@/components/minor/TTag.vue"
import TReviewTag from "@/components/minor/TReviewTag.vue"

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
</script>

<template>
	<div class="product-view-page">
		<div class="product-view-thumb">
			<van-swipe class="product-view-thumb__carousel" indicator-color="var(--gs-100)" lazy-render>
				<van-swipe-item v-for="img in 3">
					<van-image fit="contain" width="100%" height="100%" :src="product['image'+img]" />
				</van-swipe-item>

				<template #indicator="{ active, total }">
					<div class="swipe-custom-indicator">{{ active + 1 }} / {{ total }}</div>
				</template>
			</van-swipe>
		</div>

		<div class="product-view-details">

			<div class="product-view-details__head">
				<div class="product-view-details__head-title">{{ product.name }}</div>

				<div v-if="tags.length" class="product-view-tags">
					<t-review-tag />
					<div class="product-view-tags__scrollable">
						<t-tag v-for="(tag, i) in tags" :key="`t-tag-${i}`" :tag="tag" />
					</div>
				</div>

				<div v-if="product.sell_price" class="product-view-details__head-prices">
					<div class="product-view-details__head-prices-title">
						<h5>Цена</h5>
						<p v-if="product.is_available" :class="[product.is_available ? 'available': 'unavailable']">
							{{ product.is_available ? "В наличии" : "Нет в наличии" }}
						</p>
					</div>
					<div class="product-view-details__head-prices-price" :class="{'has-discount': product.discounted_price}">
						${{ Number(product.sell_price).toFixed(2) }}
					</div>
					<div v-if="product.discounted_price" class="product-view-details__head-prices-discount">
						${{ Number(product.price).toFixed(2) }}
					</div>

				</div>
				<!--				<van-divider style="width: 100%; border-color: var(&#45;&#45;gs-400)" />-->

				<van-divider style="width: 100%; border-color: var(--gs-400)" />

				<div class="product-view-details__head-description">
					<div class="product-view-details__head-description-title">Описание товара</div>
					<div class="product-view-details__head-description-content">{{ product.description }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
#app {
	background-color: var(--bg-primary);
}
</style>
<style scoped lang="scss">

.product-view-page {
	@include flex(2.4rem, column, start, start);
	overflow: hidden;
	width: 100%;
	padding: 0 0 1.2rem 0;
}

@media (min-width: 768px) {
	.product-view-thumb {
		height: calc(76.8rem - 2.4rem) !important;
	}
}

.product-view {
	&-thumb {
		--van-image-placeholder-background: var(--bg-secondary-2);
		--van-image-loading-icon-size: 6.4rem;
		width: 100%;
		height: 60svh;
		background-color: var(--bg-primary);
		border-bottom: 1px solid var(--bg-secondary-3);

		&__carousel {
			width: 100%;
			height: 100%;
		}


	}

	&-tags {
		@include flex(0, row, start, center);

		max-width: 100%;
		padding: 0 0 .8rem 0;
		margin: 0 -1.2rem 0 0;

		&__scrollable {
			@include flex(.8rem, row, start, center);

			overflow-x: auto;
			max-width: 100%;
			margin-left: -.5rem;
			margin-right: -1.2rem;

			&::-webkit-scrollbar {
				display: none;
			}
		}

		.t-review-tag {
			z-index: 9;
		}

		.t-tag {
			z-index: 1;

			&:first-of-type {
				margin-left: 1.7rem;
			}
			&:last-of-type {
				margin-right: 1.2rem;
			}
		}


	}

	&-details {
		width: 100%;
		padding: 0 1.2rem;


		&__head {
			@include flex(.8rem, column, start, start);
			--van-divider-margin: 0;

			&-title {
				@include getFont('h3');
				font-weight: 600 !important;
				color: var(--gs-100);
			}

			&-prices {
				@include flex(.6rem, row, start, flex-end);

				width: 100%;
				flex-wrap: wrap;

				&-title {
					width: 100%;
					@include flex(.8rem, row, space-between, center);

					h5 {
						@include getFont('p3');
						color: var(--gs-300);
					}

					p {
						@include getFont('p4');
						font-weight: 300 !important;

						&.available {
							color: var(--main-secondary);
						}

						&.unavailable {
							color: var(--red);
						}
					}
				}

				&-discount {
					@include getFont('h3');
					@include getFont('p2');

					font-weight: 500 !important;
					margin-bottom: .2rem;
					color: var(--main-secondary-2);
					text-decoration: line-through;
				}

				&-price {
					@include flex(.4rem, row, start, flex-end);
					@include getFont('h3');

					text-transform: uppercase;
					font-weight: 700 !important;
					color: var(--gs-100);
				}
			}

			&-description {
				@include flex(1.2rem, column, start, start);

				&-title {
					@include getFont('h4');
					font-weight: 500 !important;

					color: var(--gs-100);

				}

				&-content {
					@include getFont('p3');
					font-weight: 400 !important;

					color: var(--gs-200);
				}
			}
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
