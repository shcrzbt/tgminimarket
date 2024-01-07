<script setup>
import { computed } from "vue"
import { useLayoutStore } from "@/stores/layoutStore"
import { useRoute, useRouter } from "vue-router"

defineProps(["search", "price", "category"])
const emit = defineEmits(["search"])

const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()
const onSearch = () => emit("search")

const searchValue = computed({
	get: () => layoutStore.searchValue,
	set: (val) => layoutStore.setSearchValue(val)
})

const searchActive = computed(() => route.name === "product.search")
</script>

<template>
	<div class="search-header" :class="{'search-header--active': searchActive}">

		<div class="search-header__right">
			<van-search
				v-model="searchValue"
				@update:model-value="onSearch"
				@focus="router.push({name:'product.search'})"
				:class="{'has-action': searchActive }"
				placeholder="Поиск товаров">
				<template #action></template>
			</van-search>

			<transition name="van-slide-right">
				<div @click="router.go(-1)" class="search-field__cancel"
						 :class="{'shown': searchActive}">Отмена
				</div>
			</transition>
		</div>
	</div>
</template>

<style scoped lang="scss">
.search-header {
	@include flex(0, row, start, center);
	width: 100%;
	height: 7rem;

	&--active{
		background-color: var(--bg-secondary-3);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;

		:deep(.van-search) {
			--van-search-background: var(--bg-secondary-3);
		}
		.search-header__right {
			gap: 1.2rem;
		}
	}
	&__left {
		//@include flex(0, row, start, center);
	}

	&__right {
		@include flex(0, row, start, center);
		--van-duration-base: .15s;
		transition: all var(--van-duration-base) var(--van-ease-in);
		flex-grow: 1;
	}

	:deep(.van-search) {
		--van-search-background: var(--bg-secondary-3);
		--van-search-content-background: var(--bg-primary);
		--van-search-input-height: 5rem;
		--van-radius-sm: 1.2rem;

		background-color: transparent;
		transition: all var(--van-duration-base) var(--van-ease-in);
		flex-grow: 1;
	}

	:deep(.van-search.has-action) {
		padding-right: 0;
	}

	:deep(.van-search__action) {
		display: none;
	}

	.search-field__cancel {

		@include flex(0, row, center, center);
		@include getFont("p2");

		width: 0;
		overflow: hidden;
		height: var(--van-search-input-height);
		color: var(--gs-200);
		padding: 0rem;
		transition: all var(--van-duration-base) var(--van-ease-in);
		border-radius: var(--van-radius-sm);
		font-weight: 200 !important;

		&.shown {
			width: 7.5rem;
			padding: var(--van-search-padding);
			padding-left: 0;

		}
	}
}
</style>
