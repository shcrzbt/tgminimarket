<script setup lang="js">
	import { Card, Grid, GridItem, Image, closeNotify, showNotify } from "vant"
	import {onBeforeMount, ref, computed, reactive} from 'vue'
	import axios from "@/plugins/axios";

	const products = ref([])
	const loading = ref(false)
	const productsFiltered = ref([])
	const categories = ref([])
	const popupModel = ref(false)
	const showCatPicker = ref(false)
	const selectedProductIds = ref({})

	const productsComputed = computed(()=> products.value.filter((el)=> {
		const searchFilter = el.title.toLocaleLowerCase().includes(filters.search.toLocaleLowerCase())
		const priceFilter = el.price > filters.price[0] && el.price < filters.price[1]
		const categories = el.category.toLocaleLowerCase().includes(filters.category?.toLocaleLowerCase())
		return  searchFilter && priceFilter && (categories ? categories : true)
	}))


	const showActionButton = computed(()=> Object.keys(selectedProductIds.value).length)
	const selectedProductsCount = computed(()=> {
		let prodCount = 0
		for (const i in selectedProductIds.value) {
			if (Object.hasOwnProperty.call(selectedProductIds.value, i)) {
				const prod = selectedProductIds.value[i];
				prodCount = prodCount+prod
			}
		}
		return prodCount
	})

	const filterProducts = () => {
		productsFiltered.value = products.value.filter((el)=> {
		const searchFilter = el.title.toLocaleLowerCase().includes(filters.search.toLocaleLowerCase())
		const priceFilter = el.price > filters.price[0] && el.price < filters.price[1]
		return searchFilter && priceFilter
	})
	}
	const filters = reactive({
		search: '',
		category: null,
		price: [0, 1000]

	})
	const getCategoriesList = async () => {
		await axios.get("https://fakestoreapi.com/products/categories").then(({data}) => {
			categories.value = ['all', ...data]
		});
	};
	const getProductList = async () => {
		loading.value = true
		let categoryQuery = '';

		if (filters.category)
			categoryQuery = `/category/${filters.category}`

		await axios.get(`https://fakestoreapi.com/products${categoryQuery}`).then(({data}) => {
			products.value = data
			productsFiltered.value = data
		}).finally(()=> {
			setTimeout(()=> loading.value = false,1000)

		});
	};
	const onSubmitFilter = async ()=> {
		popupModel.value = false
		await getProductList()
		filterProducts()
	}
	const onAddToCart = (id, productName)=> {
		Object.assign(selectedProductIds.value, id)
		selectedProductIds.value[id] = 1
	}
	const updateProductCount = (id, count, productName)=> {
		if (count === 0) {
			delete selectedProductIds.value[id]
			return
		}
		selectedProductIds.value[id] = count
	}
	const overlayModel = ref(false)
	onBeforeMount(async () => {
		await getProductList();
		await getCategoriesList();
	});
</script>
<template>
	<div>
		<van-popup v-model:show="popupModel" position="top" :style="{ padding: '8px 0' }">
			<van-form @submit="onSubmitFilter">
				<van-cell-group inset title="Цена ($)">
					<van-cell title="От" :value="filters.price[0] + ' $'" />
					<van-cell title="До" :value="filters.price[1] + ' $'" />
					<van-field>
						<template #input>
							<van-slider range :step="10" :min="0" :max="1000" v-model="filters.price" />
						</template>
					</van-field>
				</van-cell-group>
				<van-cell-group title="Категория" title-style="color: black">
					<van-field
						v-model="filters.category"
						is-link
						readonly
						name="category"
						placeholder="Выберите категорию"
						@click="showCatPicker = true" />
					<van-popup v-model:show="showCatPicker" position="top">
						<van-picker
							:columns="categoriesComputed"
							@confirm="
								({ selectedOptions }) => {
									filters.category = selectedOptions[0]?.text;
									showCatPicker = false;
								}
							"
							@cancel="showCatPicker = false" />
					</van-popup>
				</van-cell-group>

				<div style="margin: 16px">
					<van-button round block type="primary" native-type="submit"> Показать </van-button>
				</div>
			</van-form>
		</van-popup>
		<van-search v-model="filters.search" show-action placeholder="Введите название товара">
			<template #action>
				<van-button
					style="border-radius: 8px"
					icon="filter-o"
					type="primary"
					@click="() => (popupModel = true)"></van-button>
			</template>
		</van-search>

		<div class="product-list" :class="{ 'action-button-shown': showActionButton }">
			<div class="filters"></div>
			<div v-if="loading" class="loading-wrapper"><van-loading size="24px">Загрузка...</van-loading></div>
			<Transition v-else name="slide-fade">
				<van-grid :gutter="12" :column-num="2">
					<van-grid-item v-for="product in productsFiltered">
						<van-image :src="product.image" />
						<div class="tag-n-price">
							<div class="tag">{{ product.category }}</div>
							<div class="price">{{ product.price }}$</div>
						</div>
						<p>
							{{ product.title }}
						</p>
						<span style="display: none">{{ selectedProductIds }}</span>
						<van-button
							v-if="!selectedProductIds.hasOwnProperty(product.id)"
							class="add-to-cart-button"
							type="primary"
							@click="onAddToCart(product.id, product.title)"
							>В корзину</van-button
						>
						<van-stepper
							v-else
							:min="0"
							class="add-to-cart-stepper"
							:model-value="selectedProductIds[product.id]"
							@update:model-value="(count) => updateProductCount(product.id, count, product.title)"
							theme="round"
							button-size="44"
							disable-input />
					</van-grid-item>
				</van-grid>
			</Transition>
		</div>
		<Transition name="slide-fade">
			<div v-if="showActionButton" class="create-order-button">
				<van-button
					style="width: 100%; height: 60px; font-size: 16px"
					type="primary"
					icon="shopping-cart-o"
					@click="onAddToCart(product.id, product.title)"
					>Корзина ({{ selectedProductsCount }})
				</van-button>
			</div>
		</Transition>
		<van-back-top
			style="--van-back-top-background: var(--van-orange-dark)"
			right="5vw"
			:bottom="!showActionButton ? '2svh' : '66px'"
			><van-icon name="arrow-up"
		/></van-back-top>
	</div>
</template>

<style lang="scss">
	.van-search {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		box-shadow: var(--van-calendar-header-shadow);
		width: 100%;
	}
	.create-order-button {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
		box-shadow: var(--van-calendar-header-shadow);
		width: 100%;
		background-color: #fff;
	}
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
		transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
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
		/* padding: 16px; */
		padding-top: 80px;
		padding-bottom: 8px;
		transition: all 0.3s ease-out;
		&.action-button-shown {
			padding-bottom: 80px;
		}
		.add-to-cart {
			&-button {
				width: calc(100% - 16px);
				border-radius: 12px;
				position: absolute;
				bottom: 8px;
			}
			&-stepper {
				width: calc(100% - 16px);
				position: absolute;
				bottom: 8px;
				display: flex;
				align-items: center;
				justify-content: center;
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
				align-items: center;
				text-transform: uppercase;
				font-size: 16px;
				font-weight: 700;
				color: var(--van-blue);
			}
		}
		.van-grid-item__content {
			background-color: var(--van-search-content-background);
			justify-content: start;
			border-radius: 12px !important;
			gap: 8px;
			padding-top: 8px;
			align-items: start;
			position: relative;
			padding-bottom: 66px;
			box-shadow: var(--van-calendar-header-shadow);
			&:after {
				border-radius: 26px !important;
			}
		}
		.van-image {
			width: 100%;
			height: 8rem;
			background-color: #fff;
			border-radius: 8px !important;
			overflow: hidden;
			padding: 1em;
			img {
				object-fit: contain;
			}
		}
		p {
			font-weight: 600;
			text-align: left;
			word-break: break-all;
		}
	}
</style>
