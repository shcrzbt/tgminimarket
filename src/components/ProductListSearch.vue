<script setup lang="js">
import { ref } from "vue"
import WebApp from "@twa-dev/sdk"
import ProductListCategories from "@/components/ProductListCategories.vue"

defineProps(["search", "price", "category"])
const emit = defineEmits(["update:search", "update:price", "update:category", "filter", "searchProducts"])


const popupModel = ref(false)
const onSubmitFilter = async () => {
	popupModel.value = false
	emit("filter")
}
const updateSearch = (val) => {
	emit("update:search", val)
	emit("searchProducts", val)
}
const updatePrice = (val) => {
	WebApp.HapticFeedback.impactOccurred("soft")
	emit("update:price", val)
}
const updateCategory = (val) => {
	emit("update:category", val);
	emit("filter")
}


</script>


<template>
	<div>
		<van-popup class="filter-popup" v-model:show="popupModel" closeable position="bottom" :style="{ padding: '0 0 8px 0' }">
			<van-cell-group title="Категории">
				<product-list-categories :cell="true" :category="category" @update:category="updateCategory" />
			</van-cell-group>

			<!--				<van-button style="margin: 16px; width: calc(100% - 3.2rem)" round block type="primary" native-type="submit"> Показать</van-button>-->
		</van-popup>

		<van-search
			:model-value="search"
			@update:model-value="updateSearch"
			show-action
			placeholder="Введите название товара">
			<template #action>
				<van-icon
					style="width: 4.5rem; text-align:center; color: var(--main-secondary)"
					name="like-o"
					size="32"
					type="primary"
					@click="() => (popupModel = true)"></van-icon>
			</template>
		</van-search>
	</div>
</template>

<style lang="scss">
.filter-popup {
	--van-popup-close-icon-margin: 1.9rem;
	max-width: 100%;
	.van-cell-group__title {
		@include getFont('h4');
		color: var(--gs-100);
		font-weight: 700 !important;
	}
}
.van-search {
	--van-search-content-background: var(--bg-primary);
	--van-search-input-height: 5rem;
	--van-radius-sm: 1.2rem;
	//position: fixed;
	//top: 0;
	//left: 0;
	//z-index: 9;
	//box-shadow: var(--van-calendar-header-shadow);
	background-color: transparent;

	width: 100%;

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

:root {
	--van-search-input-height: 44px !important;
	--van-search-input-height: 44px !important;
}

.van-search__action {
	line-height: normal !important;
}

</style>
