import { computed, onBeforeMount, reactive, ref } from "vue"
import WebApp from "@twa-dev/sdk"
import axios from "@/plugins/axios"
import { useDebounceFn, useWindowSize } from "@vueuse/core"
import { useProductStore } from "@/stores/productStore"
import { useRouter } from "vue-router"

export default function() {
	const { width, height } = useWindowSize()
	const router = useRouter()
	const productStore = useProductStore()

	const products = ref([])
	const loading = reactive({
		products: false
	})
	const loadFinished = ref(false)
	const popupModel = ref(false)
	const selectedProductIds = ref({})

	const pagination = reactive({
		page: 1
	})

	const filters = reactive({
		search: "",
		category: [],
		price: [0, 1000]
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

	const searchProducts = useDebounceFn(async () => {
		let searchValue = filters.search.trimStart()

		pagination.page = 1
		await getProductList()
	}, 500)

	const showProduct = (id) => {
		router.push({ name: "product.detail", params: { id } })
	}


	const getProductList = async (append = false) => {
		loading.products = true

		let params = {
			category_id__in: filters.category.join(","),
			search: filters.search,
			page_size: Math.ceil((height.value - 220) / 250) * 2 + 2,
			page: pagination.page
		}

		await axios.get("product-list/", { params }).then(({ data }) => {
			if (!data.links?.next) loadFinished.value = true
			// if (data.current_page_number) pagination.page = data.current_page_number

			if (append && products.value.length)
				products.value = [...products.value, ...data.results]
			else
				products.value = data.results

		}).catch(err => loadFinished.value = true)
			.finally(() => loading.products = false)

	}

	const getCategoriesList = async () => {
		productStore.setCategoriesLoading(true)
		await axios.get("category-list/").then(resp => productStore.setCategories(resp.data))
			.finally(() => productStore.setCategoriesLoading(false))
	}

	const onListLoad = useDebounceFn(async () => {
		if (!loadFinished.value) {
			pagination.page += 1
			await getProductList(true)
		}
	}, 500)

	const onSubmitFilter = async () => {
		popupModel.value = false

		await getProductList()
	}

	const onCategoryFilter = useDebounceFn(async () => {

		// if (!filters.category.length) return

		pagination.page = 1
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
		getCategoriesList()
		getProductList()
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
		showProduct,
		onSubmitFilter
	}
}