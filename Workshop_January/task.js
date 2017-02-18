function solve() {
	function getProduct(productType, name, price) {

		return {
			productType: productType,
			name: name,
			price: price
		};
	}

	function getShoppingCart() {

		var products = [];

		function add(product) {
			products.push(product);
			return this;
		}

		function remove(product) {

			if (products.length < 1) {
				throw Error('error');
			}

			for (let i = 0; i < products.length; i += 1) {
				if (products[i].productType !== product.productType &&
					products[i].name !== product.name &&
					products[i].price !== product.price) {
					throw Error('error');
				}
			}

			for (let i = 0; i < products.length; i += 1) {
				if (products[i].productType === product.productType &&
					products[i].name === product.name &&
					products[i].price === product.price) {
					products.splice(i, 1);
				}
			}

			return this;
		}

		function showCost() {

			let sum = 0;

			for (let i = 0; i < products.length; i += 1) {
				sum += products[i].price;
			}

			return sum;
		}

		function showProductTypes() {

			let uniqueProductTypes = [];

			if (products.length < 1) {
				return [];
			}

			uniqueProductTypes.push(products[0].productType);

			let isNotFound = true;

			for (let i = 1; i < products.length; i += 1) {

				isNotFound = true;
				for (let j = 0; j < uniqueProductTypes.length; j += 1) {
					if (products[i].productType === uniqueProductTypes[j]) {
						isNotFound = false;
						break;
					}
				}

				if (isNotFound) {
					uniqueProductTypes.push(products[i].productType);
				}
			}

			uniqueProductTypes.sort(function (a, b) {
				return a.localeCompare(b);
			});

			return uniqueProductTypes;
		}

		function getInfo() {

			if (products.length < 1) {
				return {
					products: [],
					totalPrice: 0
				};
			}

			let sum = 0;

			for (let i = 0; i < products.length; i += 1) {
				sum += products[i].price;
			}

			let uniqueProductNames = [];

			uniqueProductNames.push(products[0]);

			let isNotFound = true;

			for (let i = 1; i < products.length; i += 1) {

				isNotFound = true;

				for (let j = 0; j < uniqueProductNames.length; j += 1) {
					if (products[i].name === uniqueProductNames[j].name) {
						isNotFound = false;
						break;
					}
				}

				if (isNotFound) {
					uniqueProductNames.push(products[i]);
				}
			}


			let uniqueProductsObjects = [];
			let quantity = 0;
			let currentPrice = 0;

			for (let i = 0; i < uniqueProductNames.length; i += 1) {

				for (let j = 0; j < products.length; j += 1) {
					if (uniqueProductNames[i].name === products[j].name) {
						quantity += 1;
						currentPrice += products[j].price;
					}
				}

				uniqueProductsObjects.push({
					name: uniqueProductNames[i].name,
					totalPrice: currentPrice,
					quantity: quantity
				});

				quantity = 0;
				currentPrice = 0;
			}

			return {
				products: uniqueProductsObjects,
				totalPrice: sum
			};
		}


		return {
			products: products,
			add: add,
			remove: remove,
			showCost: showCost,
			showProductTypes: showProductTypes,
			getInfo: getInfo
		};
	}


	return {
		getProduct: getProduct,
		getShoppingCart: getShoppingCart
	};
}

module.exports = solve();
