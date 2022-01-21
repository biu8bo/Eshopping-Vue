<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
	export default {
		name: 'App'
	}
</script>
<style lang="scss">
	.shadow-box{
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		margin-top: 5px;
	}

	html {
		background-color: #FFFFFF;
	}
</style>
