import { reactive, ref, watch } from "vue"
import axios from "@/plugins/axios"
import { useDebounceFn } from "@vueuse/core"
import { useLayoutStore } from "@/stores/layoutStore"
import { storeToRefs } from "pinia"
import { noSpace } from "@/utils/functions"

export default function() {
	const layoutStore = useLayoutStore()
	const { searchValue } = storeToRefs(layoutStore)

	watch(searchValue, async (newVal) => await onSearch())

	const products = ref([])
	const blockSearching = ref(false)
	const loading = reactive({
		main: false,
		scroll: false
	})
	const loadFinished = ref(false)

	const pagination = reactive({
		page: 1
	})

	const onSearch = useDebounceFn(async () => {
		pagination.page = 1
		await getProductList()
	}, 500)

	const noFetching = () => {
		if (!noSpace(searchValue.value)) {
			loadFinished.value = true
			products.value = []

			return true
		}

		return false
	}


	const getProductList = async (append = false) => {

		if (noFetching()) return


		if (append) loading.scroll = true
		else loading.main = true

		let params = {
			search: searchValue.value,
			page_size: 50,
			page: pagination.page
		}

		await axios.get("product-list/", { params }).then(({ data }) => {
			if (!data.links?.next) loadFinished.value = true
			if (append && products.value.length) products.value = [...products.value, ...data.results]
			else products.value = data.results
		}).catch(err => loadFinished.value = true)
			.finally(() => {
				loading.main = false
				loading.scroll = false
			})
	}

	const onListLoad = useDebounceFn(async () => {
		if (noFetching()) return

		if (!loadFinished.value) {
			pagination.page += 1
			await getProductList(true)
		}
	}, 500)

	return {
		loading,
		products,
		searchValue,
		loadFinished,
		onListLoad,
		onSearch
	}
}