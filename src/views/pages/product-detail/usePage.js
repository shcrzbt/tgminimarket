import { onBeforeMount, ref } from "vue"
import axios from "@/plugins/axios"
import { useRoute } from "vue-router"

export default function() {
	const route = useRoute()
	const product = ref([])
	const loading = ref(false)


	const getProductDetail = async () => {
		loading.value = true
		await axios.get(`product-detail/${route.params.id}/`).then(({ data }) => {
			product.value = data
		}).finally(() => loading.value = false)
	}

	onBeforeMount(async () => {
		await getProductDetail()
	})

	return {
		loading,
		product
	}
}