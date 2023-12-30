import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "main",
			redirect: { name: "product.list" },
		},
		{
			path: "/products",
			name: "product.list",
			component: () => import("@/views/pages/product-list/ProductListPage.vue"),
		},
		{
			path: "/products/:id",
			name: "product.detail",
			component: () => import("@/views/pages/product-detail/ProductDetailPage.vue"),
		},
	],
});

export default router;
