import axios from "axios"

const config = {
	baseURL: import.meta.env.VITE_BASE_URL + "api/v1/",
	// headers: {
	// 	"access-control-allow-methods": "GET, PUT, POST, DELETE, OPTIONS, POST, GET, OPTIONS, DELETE, PUT, PATCH",
	// 	accept: "application/json",
	// 	"access-control-max-age": "3600, 3600",
	// 	"access-control-allow-headers":
	// 		"x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN, Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers"
	// }
	headers: {
		accept: "*/*",
		"Content-Type": "application/json",
	},
}

const axiosInstance = axios.create(config)

axiosInstance.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error)
	}
)

export default axiosInstance
