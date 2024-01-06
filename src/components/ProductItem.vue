<script setup lang="js">
import { computed } from "vue"

const props = defineProps(["product", "index"])
 defineEmits(["update:search", "cart"])

const getLastWeeksDate = () => {
	const now = new Date()

	return new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() - 6
	)
}

const isNewProduct = computed(() => new Date(props.product.create_time) >= getLastWeeksDate())

</script>


<template>
	<van-grid-item>

		<div class="product-item">
			<div class="product-item__image">
				<lazy-component style="width:100%; height:100%">
					<van-image lazy-load :src="product?.image1" v-lazy="product?.image1" />
				</lazy-component>
				<div class="tag-new" v-if="isNewProduct">
					Новинка
				</div>
				<div class="tags">
					<div class="tag" v-if="product.discounted_price">
						% Скидка
					</div>
					<div class="tag" v-if="product.discounted_price">
						<van-count-down millisecond :time="30000000" format="HH:mm:ss" />
					</div>

				</div>
			</div>
			<div class="product-item__details">
				<p>{{ product.name }}</p>
				<div class="tag-n-price">

					<div v-if="product.discounted_price" class="price">${{ product.discounted_price.toFixed(2) }}
						<del>${{ product.price.toFixed(2) }}</del>
					</div>

					<div v-else class="price">${{ product.price.toFixed(2) }}</div>


				</div>
			</div>


		</div>

		<!--		<van-button-->
		<!--			v-if="!selectedProductIds.hasOwnProperty(product.id)"-->
		<!--			class="add-to-cart-button"-->
		<!--			type="primary"-->
		<!--			@click="onAddToCart(product.id, product.title)"-->
		<!--		>В корзину-->
		<!--		</van-button>-->
		<!--		<van-stepper-->
		<!--			v-else-->
		<!--			:min="0"-->
		<!--			class="add-to-cart-stepper"-->
		<!--			:model-value="selectedProductIds[product.id]"-->
		<!--			@update:model-value="(count) => updateProductCount(product.id, count, product.title)"-->
		<!--			theme="round"-->
		<!--			button-size="44"-->
		<!--			disable-input />-->
	</van-grid-item>
</template>

<style lang="scss" scoped>
.product-item {
	@include flex(1.2rem, column, space-between, start);
	width: 100%;
	height: 100%;

	&__image {
		width: 100%;
		height: 16.2rem;
		position: relative;
		background-color: var(--bg-primary);
		border-radius: 1.6rem;
		overflow: hidden;

		.tag-new {
			position: absolute;
			top: 1.8rem;
			right: 0;
			transform-origin: center;
			transform: rotate(45deg) scale(.7);
			padding: .4rem .8rem;
			background-color: var(--red);
			color: var(--bg-primary);
			border-radius: .8rem;
		}

		.tags {
			@include flex(.4rem, row, start, center);
			position: absolute;
			bottom: .8rem;
			left: .8rem;

			.tag {
				@include getFont('p4');
				font-size: 1rem !important;
				padding: 0 .4rem;
				background-color: var(--main-secondary);
				color: var(--bg-primary);
				border-radius: .8rem;

				:deep(.van-count-down) {
					@include getFont('p4');
					font-size: 1rem !important;
					--van-count-down-text-color: var(--bg-primary) !important;
				}
			}

		}
	}


	&__details {
		@include flex(.8rem, column, space-between, start);

		padding: 0 4px;
		flex-grow: 1;
		margin-bottom: .8rem;

		p {

			@include getFont('p3');
			font-weight: 600;
			text-align: left;
		}
	}

	.tag-n-price {
		@include flex(.8rem, row, space-between, center);

		width: 100%;
		flex-wrap: wrap;

		.price {
			@include getFont('c-bold');

			display: flex;
			align-items: flex-end;
			text-transform: uppercase;
			font-size: 16px;
			font-weight: 700;
			color: var(--gs-100);

			del {
				font-weight: 500;
				font-size: 14px;
				color: var(--van-gray-5);
				margin-left: 8px;
			}
		}
	}


	:deep(.van-image) {
		width: 100%;
		height: 100%;
		border-radius: 8px !important;
		overflow: hidden;

		img {
			object-fit: contain;
		}
	}

	//.add-to-cart {
	//	&-button {
	//		width: calc(100% - 16px);
	//		border-radius: 12px;
	//		position: absolute;
	//		bottom: 8px;
	//	}
	//
	//	&-stepper {
	//		width: calc(100% - 16px);
	//		position: absolute;
	//		bottom: 8px;
	//		display: flex;
	//		align-items: center;
	//		justify-content: center;
	//	}
	//}

}
</style>
