<script setup>
// JS
import storeItems from "../data/storeItems.js";
import { userBalance } from "../data/userBalance";
import { reactive } from "vue";
import { ref } from "vue";
import { computed } from "vue";
import { onMounted } from "vue";

const cartItems = reactive([]);

// Function for button to call
function addToCart(cost, item, idx) {
	if (userBalance.value < cost) {
		alert("Not enough balance!");
		return;
	}

	const existing = cartItems.find((cartItem) => cartItem.title === item);

	if (existing) {
		existing.quantity += 1; // increment quantity on the existing entry
	} else {
		cartItems.push({ ...storeItems[idx], quantity: 1 }); // add new with quantity
	}

	// Total quantity

	// Debugging
	console.log(JSON.stringify(cartItems));
	console.log(totalQuantity);
}

// Checkout quantity input update onchange
function updateQuantity(item, e) {
	// Get the new user quantity.
	item.quantity = e;

	console.log(e);
	console.log(cartItems.value);
}

const totalCost = computed(() =>
	cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0),
);
const totalQuantity = computed(() =>
	cartItems.reduce((sum, item) => sum + item.quantity, 0),
);

function switchCategory(num) {
	switch (num) {
		case 1:
	}
}

// GOOGLE PAY
onMounted(() => {
	if (window.google && window.google.payments) {
		const paymentsClient = new google.payments.api.PaymentsClient({
			environment: "TEST",
		});
		const button = paymentsClient.createButton({
			onClick: () => {
				// Handle Google Pay button click
			},
		});
		document.getElementById("google-pay-button").appendChild(button);
	}
});

// PayPal
onMounted(() => {
	if (window.paypal) {
		window.paypal
			.Buttons({
				createOrder: (data, actions) => {
					return actions.order.create({
						purchase_units: [
							{
								amount: { value: "10.00" }, // Set your amount here
							},
						],
					});
				},
				onApprove: (data, actions) => {
					return actions.order.capture().then(function (details) {
						alert("Transaction completed by " + details.payer.name.given_name);
					});
				},
			})
			.render("#paypal-button-container");
	}
});
</script>

<template>
	<!-- HTML -->

	<!-- Header -->
	<div class="container-fluid text-light">
		<header class="mb-3 p-4 headerBack row">
			<div class="col-10">
				<h2 class="h4 mb-1">Store</h2>
				<p class="text-secondary mb-0">
					Browse items and customize your experience.
				</p>
			</div>
			<div class="col-2 text-end">
				<p>{{ totalQuantity }} <i class="bi bi-cart4"></i></p>
			</div>
		</header>

		<main class="row g-3 shadow-lg rounded">
			<div class="sidebar col-12 col-md-3 col-lg-2 p-0 d-flex flex-column">
				<ul class="list-group list-group-flush unselectable flex-grow-1">
					<li
						class="list-group-item list-group-item-action text-light bg-dark hoverable"
						@click="switchCategory(1)"
						id="ide_themes"
					>
						IDE Themes
					</li>
					<li
						class="list-group-item list-group-item-action active border-0 hoverable"
						@click="switchCategory(2)"
						id="icons"
					>
						Icons
					</li>
					<li
						class="list-group-item list-group-item-action text-light bg-dark hoverable"
						@click="switchCategory(3)"
						id="banners"
					>
						Banners
					</li>
				</ul>
				<!-- v-for dynamically render the objects. -->

				<button
					type="button"
					class="btn btn-primary m-auto col-10 mb-4"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal"
				>
					Checkout
				</button>
			</div>
			<div class="MainContent col">
				<div
					class="row row-cols-1 row-cols-sm-2 row-cols-md-6 row-cols-xl-6 g-1"
				>
					<div class="col" v-for="(item, idx) in storeItems" :key="idx">
						<div
							class="text-light border-secondary d-flex justify-content-center flex-column"
						>
							<img
								:src="item.img"
								class="fixedImage mx-auto rounded hoverableImg"
								:alt="item.title"
							/>
							<div class="text-center pt-3 m-auto">
								<h5 class="m-0">{{ item.title }}</h5>
								<p><i class="bi bi-coin me-2"></i>{{ item.cost }}</p>
							</div>
							<div class="bg-transparent border-0 pb-3">
								<div class="d-flex justify-content-center">
									<button
										type="button"
										class="btn btn-outline-info"
										v-on:click="addToCart(item.cost, item.title, idx)"
									>
										Add To Cart
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal fade" tabindex="-1" id="exampleModal">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title">Checkout</h5>
								<button
									type="button"
									class="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div class="modal-body">
								<h5>Cart:</h5>
								<ul class="cartItems p-4 d-flex flex-column gap-3">
									<li
										v-for="(item, index) in cartItems"
										:key="index"
										class="d-flex justify-content-between borderPlease px-3 py-2 rounded align-items-center"
									>
										{{ item.title }}
										<span class="quantity ms-auto flex-shrink-0">
											<input
												type="number"
												class="form-control form-control-sm text-center p-1"
												:value="item.quantity"
												min="1"
												style="width: 2rem"
												@change="updateQuantity(item, $event.target.value)"
											/> </span
										><i
											class="bi bi-trash ps-3"
											@click="
												(cartItems.splice(index, 1),
												console.log(JSON.stringify(cartItems)))
											"
										></i>
									</li>
								</ul>
								<h3>Total: ${{ totalCost }}</h3>
							</div>
							<div class="modal-footer">
								<div id="google-pay-button" class="w-100"></div>
								<div id="paypal-button-container"></div>
								<button
									type="button"
									class="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<button type="button" class="btn btn-primary">
									Confirm Purchase
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
		<footer></footer>
	</div>
</template>

<style scoped>
main {
	height: 90%;
	width: 100%;
	background-color: rgb(11, 11, 11);
	margin: 0 auto;
	padding: 1rem;
}
.unselectable {
	user-select: none;
}
.hoverable:hover {
	background-color: #5581d7;
	color: #ffffff;
	cursor: pointer;
}
.fixedImage {
	object-fit: cover;
	height: 140px;
	width: 140px;
	box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.679);
}
.sidebar {
	/* background-color: rgba(22, 22, 22, 0.79); */
	box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.559);
}
.cartItems {
	list-style: none;
	gap: 10px;
}
.quantity {
	background-color: white;
	color: black;
}
.borderPlease {
	border: 1px solid black;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
input[type="number"] {
	-moz-appearance: textfield;
}
.bi-trash {
	color: rgb(176, 7, 7);
	text-shadow: 0px 0px 4px 10px black;
	filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
}
.bi-trash:hover {
	cursor: pointer;
	color: red;
}
.hoverableImg:hover {
	scale: 1.02;
	transition: 0.1s ease-out;
	cursor: pointer;
}
.max-width-custom {
	max-width: 100%;
}
.active {
	scale: 1.05;
}
.headerBack {
	background: linear-gradient(
		180deg,
		rgb(5, 5, 5) 0%,
		rgb(13, 13, 13) 40%,
		rgb(7, 6, 0) 100%
	);
}

/* API STUFF */
#google-pay-button {
	display: flex;
	justify-content: center;
}
#google-pay-button > div {
}
#google-pay-button * {
}
</style>
