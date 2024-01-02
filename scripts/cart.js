// export const cart = [];

let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
	cart = [
		{
			productId: products[0].id,
			quantity: 2,
			deliveryId: "1"
		}, {
			productId: products[1].id,
			quantity: 1,
			deliveryId: "2"
		}
	]
}

function saveToStorage() {
	localStorage.setItem("cart", JSON.stringify(cart));
}


function addToCart(productId) {
	let matchingItem;

	cart.forEach((cartItem) => {
		if (cartItem.productId === productId) {
			matchingItem = cartItem;
		}
	})

	if (matchingItem) {
		matchingItem.quantity += 1;
	} else {
		cart.push({
			productId,
			quantity: 1,
			deliveryId: `1`
		})
	}

	saveToStorage();
}

function removeFromCart(productId) {
	const newCart = [];

	cart.forEach((itemCart) => {
		if (itemCart.productId !== productId) {
			newCart.push(itemCart);
		}
	});

	cart = newCart;

	saveToStorage();
}

function updateDeliveryOption(productId, updateDeliveryOption) {
	console.log(10);
	let matchingItem;

	cart.forEach((cartItem) => {
		if (productId === cartItem.productId) {
			matchingItem = cartItem;
		}
	});

	matchingItem.deliveryId = updateDeliveryOption;

	saveToStorage();
}