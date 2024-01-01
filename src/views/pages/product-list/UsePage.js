import { computed, onBeforeMount, reactive, ref } from "vue"
import WebApp from "@twa-dev/sdk"
import axios from "@/plugins/axios"
import { useDebounceFn } from "@vueuse/core"

export default function() {

	const products = ref([])
	const loading = ref(false)
	const loadFinished = ref(false)
	const popupModel = ref(false)
	const selectedProductIds = ref({})

	const pagination = reactive({
		page: 1
	})
	const filters = reactive({
		search: "", category: [], price: [0, 1000]

	})

	const showActionButton = computed(() => {
		if (Object.keys(selectedProductIds.value).length) {
			WebApp.MainButton.show()
			WebApp.MainButton.setText("Корзина")
		} else WebApp.MainButton.hide()

		return Object.keys(selectedProductIds.value).length
	})
	const selectedProductsCount = computed(() => {
		let prodCount = 0
		for (const i in selectedProductIds.value) {
			if (Object.hasOwnProperty.call(selectedProductIds.value, i)) {
				const prod = selectedProductIds.value[i]
				prodCount = prodCount + prod
			}
		}
		WebApp.HapticFeedback.impactOccurred("heavy")
		WebApp.MainButton.setText(`Корзина (${prodCount})`)
		return prodCount
	})

	const searchProducts = async () => {
		let searchValue = filters.search.trimStart()

		if (!searchValue) return

		await getProductList()
	}


	const getProductList = async () => {
		loading.value = true

		let params = {
			category_id: filters.category, search: filters.search, page: pagination.page
		}

		await axios.get("products", { params }).then(({ data }) => {
			if (!data.next) loadFinished.value = true
			if (data.page) pagination.page = data.page

			if (products.value.length) products.value = [...products.value, ...data.results]
			else products.value = data.results


		}).catch(err => {
			loadFinished.value = true

		}).finally(() => {
			loading.value = false
		})

	}

	const onListLoad = async () => {

		if (!loadFinished.value) {
			pagination.page += 1
			await getProductList()
		}


	}

	const onSubmitFilter = async () => {
		popupModel.value = false

			await getProductList()
	}

	const onCategoryFilter = useDebounceFn(async () => {
		await getProductList()
	}, 500)

	const onAddToCart = (id, productName) => {
		Object.assign(selectedProductIds.value, id)
		selectedProductIds.value[id] = 1
	}

	const updateProductCount = (id, count, productName) => {
		if (count === 0) {
			delete selectedProductIds.value[id]
			return
		}
		selectedProductIds.value[id] = count
	}

	onBeforeMount(async () => {
		WebApp.ready()
		WebApp.expand()
		await getProductList()
	})


	return {
		loading,
		selectedProductsCount,
		selectedProductIds,
		products,
		filters,
		loadFinished,
		onCategoryFilter,
		onListLoad,
		searchProducts,
		onSubmitFilter
	}
}