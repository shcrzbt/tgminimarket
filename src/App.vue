<script setup>
import { RouterView } from "vue-router"
import WebApp from "@twa-dev/sdk"
import { onMounted, ref } from "vue"

const theme = ref('light')

onMounted(()=> {
	theme.value = WebApp.colorScheme
})
</script>

<template>
	<van-config-provider :theme="theme">
	<RouterView />
	</van-config-provider>
</template>
