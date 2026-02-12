<script setup>
import { userBalance } from "./data/userBalance";
</script>

<template>
	<div class="container-fluid p-0">
		<nav class="navbar navbar-expand-sm navbar-light bg-light px-4">
			<div class="container-fluid">
				<a class="navbar-brand me-5" href="#">Website</a>
				<p class="mb-0">
					<i class="bi bi-coin me-2"></i>Coins: {{ userBalance }}
				</p>
				<div class="navbar-nav ms-auto">
					<router-link class="nav-link" to="/">Home</router-link>
					<router-link class="nav-link" to="/leaderboards"
						>Leaderboards</router-link
					>
					<router-link class="nav-link" to="/profile">Profile</router-link>
					<router-link class="nav-link" to="/social">Social</router-link>
					<router-link class="nav-link" to="/store">Store</router-link>
				</div>
			</div>
		</nav>
		<div class="container-fluid p-0 vh-100 generalBack">
			<router-view />
		</div>
	</div>
</template>

<style scoped>
.navbar {
	border-bottom: 1px solid #e0e0e0;
}

.generalBack {
	background: linear-gradient(rgb(11, 11, 11), rgb(16, 16, 16));
}
</style>
