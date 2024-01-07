import { createRouter, createWebHistory } from "vue-router"
import WebApp from "@twa-dev/sdk"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "main",
			redirect: { name: "product.list" }
		},
		{
			path: "/products",
			name: "product.list",
			component: () => import("@/views/pages/product-list/ProductListPage.vue"),
			meta: {
				layout: "MainLayout"
			}
		},
		{
			path: "/products/:id",
			name: "product.detail",
			component: () => import("@/views/pages/product-detail/ProductDetailPage.vue")
		},
		{
			path: "/search",
			name: "product.search",
			component: () => import("@/views/pages/search-results/SearchResultsPage.vue"),
			meta: {
				layout: "MainLayout",
				backButton: true
			}
		}
	]
})


router.beforeEach(async (to, from, next) => {
	if (to.meta.backButton) {
		WebApp.BackButton.show()
		WebApp.BackButton.onClick(() => {
			router.go(-1)
		})
	} else {
		WebApp.BackButton.hide()
		WebApp.BackButton.offClick()

	}
	next()
})


export default router
