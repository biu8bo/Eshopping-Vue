<template>
	<div>
		<van-empty image="error" :description="text" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				text: null
			};
		},
		created() {
			this.text = this.$route.params.msg
		}
	};
</script>

<style>
</style>
