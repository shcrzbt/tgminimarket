<script setup lang="js">
import { onMounted, ref } from "vue"
import WebApp from "@twa-dev/sdk"


const props = defineProps(["value", "checked", "label", "icon"])
// const emit = defineEmits(["update:category"])
const chbxRef = ref(null)

const toggleCheckbox = () => {
	WebApp.HapticFeedback.impactOccurred("heavy")
	if (chbxRef.value)
		chbxRef.value.toggle()
}

defineExpose({
	toggleCheckbox
})

onMounted(() => {
	if (chbxRef.value)
		chbxRef.value.shown = false
})
</script>


<template>
	<div class="category-item">
		<div class="category-item__label " :class="{'category-item__label--checked': checked}">
			{{ label }}
		</div>
		<van-checkbox
			style="display:none"
			:name="value"
			ref="chbxRef"
			@click.stop
		/>
	</div>
</template>

<style scoped lang="scss">
.category-item {
	@include flex(.8rem, column, center, center);
	cursor: pointer;

	&:first-child {
		margin-left: 12px;
	}

	&:last-child {
		margin-right: 24px;
	}

	&__label {
		@include getFont('p3');
		font-size: 12px;
		display: block;
		color: black;
		text-align: center;
		padding: .8rem 1.6rem;
		border-radius: 12px;
		max-width: 100%;
		white-space: nowrap;

		&:not(.category-item__label--checked) {
			background-color: var(--bg-secondary-2);
		}

		&--checked {
			background-color: var(--main-secondary);
			color: var(--bg-primary);
		}
	}


}

</style>

