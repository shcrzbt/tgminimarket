<script setup lang="js">
import { ref } from "vue"
import WebApp from "@twa-dev/sdk"
import CategoriesFilter from "@/components/Filters/CategoriesFilter.vue"

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
const updateCategory = (val) => emit("update:category", val)


</script>


<template>
	<div>
		<van-popup v-model:show="popupModel" position="top" :style="{ padding: '8px 0' }">
			<van-form @submit="onSubmitFilter">
				<van-cell-group v-if="false" inset title="Цена ($)">
					<van-cell title="От" :value="price[0] + ' $'" />
					<van-cell title="До" :value="price[1] + ' $'" />

					<van-field>
						<template #input>
							<van-slider
								range
								:step="10"
								:min="0"
								:max="1000"
								:model-value="price"
								@update:model-value="updatePrice" />
						</template>
					</van-field>
				</van-cell-group>

				<categories-filter :category="category" @update:category="updateCategory" />

				<van-button style="margin: 16px" round block type="primary" native-type="submit"> Показать</van-button>
			</van-form>
		</van-popup>

		<van-search
			:model-value="search"
			@update:model-value="updateSearch"
			show-action
			placeholder="Введите название товара">
			<template #action>
				<van-button
					style="border-radius: 8px"
					icon="filter-o"
					type="primary"
					@click="() => (popupModel = true)"></van-button>
			</template>
		</van-search>
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
	--van-radius-sm: 8px;
	--van-search-input-height: 44px !important;
	--van-search-input-height: 44px !important;
}

.van-search__action {
	line-height: normal !important;
}

</style>
