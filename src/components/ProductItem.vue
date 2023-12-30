<script setup lang="js">

defineProps(["product","index"])
const emit = defineEmits(["update:search", "cart"])


</script>


<template>
	<van-grid-item>

		<div class="product-item">
			<div class="product-item__image">
				<van-image :src="product?.image1" />
				<div class="tags">
					<van-tag mark type="warning">Скидка</van-tag>
				</div>
			</div>
			<div class="product-item__details">
				<p>{{ product.name }}</p>
				<div class="tag-n-price">
					<!--				<div class="tag">{{ product?.category_name }}</div>-->
					<div class="price">{{ product.price }}$  <del>{{ product.price + (Number(product.price)*0.15) }}$</del></div>
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
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: space-between;
	gap: 8px;

	&__image {
		width: 100%;
		height: 8rem;
		position: relative;
		.tags {
			position: absolute;
			bottom: 8px;
			left: 0;
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
	&__details{
		padding: 0 4px;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: space-between;
		gap: 8px;
		flex-grow: 1;
		p {
			font-weight: 600;
			text-align: left;
			//word-break: break-all;
		}
	}
	.tag-n-price {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		width: 100%;
		flex-wrap: wrap;

		.tag {
			display: flex;
			align-items: center;
			text-transform: uppercase;
			background-color: var(--van-orange-dark);
			color: #fff;
			padding: 4px 8px;
			border-radius: 4px;
			line-height: 12px !important;
			font-size: 12px;
			font-weight: 700;
		}

		.price {
			display: flex;
			align-items: flex-end;
			text-transform: uppercase;
			font-size: 16px;
			font-weight: 700;
			color: var(--van-blue);
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
		background-color: #fff;
		border-radius: 8px !important;
		overflow: hidden;
		padding: 1em;

		img {
			object-fit: contain;
		}
	}


}
</style>
