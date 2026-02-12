import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Leaderboards from "../views/Leaderboards.vue";
import Profile from "../views/Profile.vue";
import Social from "../views/Social.vue";
import Store from "../views/Store.vue";

const routes = [
	{ path: "/", component: Home },
	{ path: "/leaderboards", component: Leaderboards },
	{ path: "/profile", component: Profile },
	{ path: "/social", component: Social },
	{ path: "/store", component: Store },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

/*

1. createRouter: This function is used to create a new instance of the Vue Router. It is the main object that manages navigation and routing the the view application.

2. history: createWebHistory(): 
	- This specifies the type of history mode the router should use.
	- createWebHistory() enables the HTML5 History Mode, which uses the browser's history.pushState API to cretae clean URLs(e.g., /profile) without hash symbols.
	- This is ideal for modern web applications where you want clean and user-friendly URLs.

3. routes:
	- This is the array of route definitions that you defined earlier in the file. Each route specifies a path (URL) and the corresponding component to render when that path is visited.

Summary:
	This part of the code initializes the Vue Router with the specified routes and sets it to use the HTML5 History Mode. The router object is then exported so it can be used in your Vue app (typically in the main.js file) to enable navigation between different views.


HTML5 History Mode:
	- Clean URLs: example.com/#/profile > example.com/profile

	- Browser history API the history.pushState method allows you to add entries to the browser's history stack without causing a full page reload.

	- Server-Side Configuration: Since the browser directly requests the clear URL (/profile), the server must be configured to handle these requests and serve the correct HTML file (usally index.html for single-page applications.)

*/

export default router;
