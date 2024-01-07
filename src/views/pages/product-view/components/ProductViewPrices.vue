<script setup>
defineProps(["isAvailable", "sellPrice", "price", "discountPrice"])
</script>

<template>
	<div class="product-view-prices">
<!--		<div class="product-view-prices__title">-->
<!--			<h5>Цена</h5>-->

<!--			<p v-if="isAvailable" :class="[isAvailable ? 'available': 'unavailable']">-->
<!--				{{ isAvailable ? "В наличии" : "Нет в наличии" }}-->
<!--			</p>-->
<!--		</div>-->

		<div class="product-view-prices__price" :class="{'has-discount': discountPrice}">
			${{ Number(sellPrice || 0).toFixed(2) }}
		</div>

		<div v-if="discountPrice" class="product-view-prices__discount">
			${{ Number(price || 0).toFixed(2) }}
		</div>
	</div>
</template>

<style scoped lang="scss">


.product-view-prices {
	@include flex(.6rem, row, start, flex-end);

	width: 100%;
	flex-wrap: wrap;
	background-color: var(--bg-secondary-2);
	border-radius: 1.2rem;
	padding: 1.6rem;

	&__title {
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
				color: var(--main-secondary)
			}

			&.unavailable {
				color: var(--red)
			}
		}


	}

	&__discount {
		@include getFont('h3');
		@include getFont('p3');

		font-weight: 400 !important;
		color: var(--main-secondary-2);
		text-decoration: line-through;
		margin-bottom: .2rem;
	}

	&__price {
		@include flex(.4rem, row, start, flex-end);
		@include getFont('h4');

		text-transform: uppercase;
		font-weight: 800 !important;

		color: var(--gs-100);
	}

}

</style>