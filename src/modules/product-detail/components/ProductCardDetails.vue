<script setup>
defineProps(["product"])
</script>

<template>
	<div class="product-card-details">
		<div class="product-card-details__head">
			<div class="product-card-details__head-title van-multi-ellipsis--l2">{{ product.name }}</div>

			<div class="product-card-details__head-reviews">
				<div class="product-card-details__head-reviews-stars">
					<van-icon name="star" color="var(--orange)"></van-icon>
					4.9
				</div>

				<div class="product-card-details__head-reviews-count">(77 &nbspOценок)</div>
			</div>
		</div>


		<div class="product-card-details__prices">
			<div class="product-card-details__prices-price" :class="{'has-discount': product.discounted_price}">
				${{ Number(product.sell_price).toFixed(2) }}
			</div>

			<div v-if="product.discounted_price" class="product-card-details__prices-discount">
				${{ Number(product.price).toFixed(2) }}
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">

.product-card-details {
	@include flex(.8rem, column, space-between, start);

	padding: 0 4px;
	flex-grow: 1;
	margin-bottom: .8rem;

	&__head {
		&-title {
			@include getFont('p3');

			font-weight: 600;
			text-align: left;
		}

		&-reviews {
			@include flex(.8rem, row, start, center);
			@include getFont('p4');

			font-weight: 200 !important;

			&-stars {

				color: var(--gs-100);
			}

			&-count {

				color: var(--main-secondary-2);
			}
		}


	}

	&__prices {
		@include flex(.4rem, row, space-between, flex-end);

		width: 100%;
		flex-wrap: wrap;

		&-discount {
			font-weight: 500;
			font-size: 14px;
			margin-bottom: .1rem;
			color: var(--main-secondary-2);
			text-decoration: line-through;
		}

		&-price {
			@include getFont('c-bold');

			display: flex;
			align-items: flex-end;
			text-transform: uppercase;
			font-size: 16px;
			font-weight: 700;
			color: var(--gs-100);
		}
	}


}

</style>