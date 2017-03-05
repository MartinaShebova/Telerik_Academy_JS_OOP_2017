function solve() {

	const generateID = (function () {
		let counter = 0;

		return function () {
			counter += 1;
			return counter;
		};
	})();

	const validations = {
		lengthBetween1and20: function (x) {
			if (x.length < 1 || x.length > 20) {
				throw new Error('Wrong length');
			}
		},

		lengthBetween1and10: function (x) {
			if (x.length < 1 || x.length > 10) {
				throw new Error('Wrong length');
			}
		},

		lengthBetween5and20: function (x) {
			if (x.length < 5 || x.length > 20) {
				throw new Error('Wrong length');
			}
		},

		lengthBetween100and3000: function (x) {
			if (x.length < 100 || x.length > 3000) {
				throw new Error('Wrong length');
			}
		},

		stringCheck: function (x) {
			if (typeof x !== 'string') {
				throw new Error('x must be a string');
			}
		},

		numberCheck: function (x) {
			if (typeof x !== 'number') {
				throw new Error('x must be a number');
			}
		},

		positiveNonZeroNumber: function (x) {
			if (x <= 0) {
				throw new Error('x must be positive, non zero number');
			}
		},

		integerCheck: function (x) {
			if (!(Number.isInteger(x))) {
				throw new Error('x must be integer number');
			}
		},

		highMidLowCheck: function (x) {
			if (x !== 'high' && x !== 'mid' && x !== 'low') {
				throw new Error('x must be high, mid or low');
			}
		},

		hasMicrophoneCheck: function (x) {
			if (x === false ||
				x <= 0 ||
				typeof x === undefined ||
				typeof x === null ||
				x === "") {
				x = false;
			}
			else {
				x = true;
			}
			return x;
		},
	};

	class Product {
		constructor(manufacturer, model, price) {
			this.id = generateID();
			this.manufacturer = manufacturer;
			this.model = model;
			this.price = price;

		}

		get manufacturer() {
			return this._manufacturer;
		}

		set manufacturer(m) {

			validations.stringCheck(m);
			validations.lengthBetween1and20(m);

			this._manufacturer = m;
		}

		get model() {
			return this._model;
		}

		set model(mod) {

			validations.stringCheck(mod);
			validations.lengthBetween1and20(mod);

			this._model = mod;
		}

		get price() {
			return this._price;
		}

		set price(p) {

			validations.numberCheck(p);
			validations.positiveNonZeroNumber(p);
			this._price = p;
		}

		getLabel() {
			return this.manufacturer + ' ' + this.model + ' - **' + this.price + '**';
		}
	}

	class SmartPhone extends Product {
		constructor(manufacturer, model, price, screenSize, operatingSystem) {
			super(manufacturer, model, price);
			this.screenSize = screenSize;
			this.operatingSystem = operatingSystem;
		}

		get screenSize() {
			return this._screenSize;
		}

		set screenSize(s) {

			validations.numberCheck(s);
			validations.positiveNonZeroNumber(s);

			this._screenSize = s;
		}

		get operatingSystem() {
			return this._operatingSystem;
		}

		set operatingSystem(os) {

			validations.stringCheck(os);
			validations.lengthBetween1and10(os);

			this._operatingSystem = os;
		}

		getLabel() {
			let getLabelResult = super.getLabel();
			return this.constructor.name + ' - ' + getLabelResult;
		}

	}

	class Charger extends Product {
		constructor(manufacturer, model, price, outputVoltage, outputCurrent) {
			super(manufacturer, model, price);
			this.outputVoltage = outputVoltage;
			this.outputCurrent = outputCurrent;
		}

		get outputVoltage() {
			return this._outputVoltage;
		}

		set outputVoltage(ov) {

			validations.numberCheck(ov);

			if (ov < 5 || ov > 20) {
				throw new Error('Wrong length jdaskdjksdjksajd');
			}

			this._outputVoltage = ov;
		}

		get outputCurrent() {
			return this._outputCurrent;
		}

		set outputCurrent(oc) {

			validations.numberCheck(oc);
			if (oc < 100 || oc > 3000) {
				throw new Error('Wrong length');
			}

			this._outputCurrent = oc;
		}

		getLabel() {
			let getLabelResult = super.getLabel();
			return this.constructor.name + ' - ' + getLabelResult;
		}
	}

	class Router extends Product {
		constructor(manufacturer, model, price, wifiRange, lanPorts) {
			super(manufacturer, model, price);
			this.wifiRange = wifiRange;
			this.lanPorts = lanPorts;
		}

		get wifiRange() {
			return this._wifiRange;
		}

		set wifiRange(wR) {

			validations.numberCheck(wR);
			validations.positiveNonZeroNumber(wR);

			this._wifiRange = wR;
		}

		get lanPorts() {
			return this._lanPorts;
		}

		set lanPorts(lp) {

			validations.integerCheck(lp);
			validations.positiveNonZeroNumber(lp);

			this._lanPorts = lp;
		}

		getLabel() {
			let getLabelResult = super.getLabel();
			return this.constructor.name + ' - ' + getLabelResult;
		}
	}

	class Headphones extends Product {
		constructor(manufacturer, model, price, quality, hasMicrophone) {
			super(manufacturer, model, price);
			this.quality = quality;
			this.hasMicrophone = hasMicrophone;
		}

		get quality() {
			return this._quality;
		}

		set quality(q) {

			validations.stringCheck(q);
			validations.highMidLowCheck(q);
			this._quality = q;
		}

		get hasMicrophone() {
			return this._hasMicrophone;
		}

		set hasMicrophone(hasMic) {

			hasMic = validations.hasMicrophoneCheck(hasMic);

			this._hasMicrophone = hasMic;
		}

		getLabel() {
			let getLabelResult = super.getLabel();
			return this.constructor.name + ' - ' + getLabelResult;
		}
	}

	class HardwareStore {
		constructor(name) {
			this.name = name;
			this.products = [];
			this.moneyEarned = 0;
		}

		get name() {
			return this._name;
		}

		set name(n) {

			validations.stringCheck(n);
			validations.lengthBetween1and20(n);
			this._name = n;
		}

		stock(product, quantity) {

			if (!(product instanceof Product)) {
				throw new Error('product must be an instance of Product');
			}

			validations.numberCheck(quantity);
			validations.integerCheck(quantity);
			validations.positiveNonZeroNumber(quantity);

			product.quantity = quantity;


			let isFoundSameProduct = false;

			for (let i = 0; i < this.products.length; i += 1) {
				if (this.products[i].id === product.id) {
					this.products[i].quantity += quantity;
					isFoundSameProduct = true;
					break;
				}
			}

			if (!isFoundSameProduct) {
				this.products.push(product);
			}

			return this;
		}

		sell(productId, quantity) {

			if (typeof productId !== 'number') {
				throw new Error('productId must be a number');
			}

			validations.numberCheck(quantity);
			validations.integerCheck(quantity);
			validations.positiveNonZeroNumber(quantity);

			if (Number.isNaN(quantity)) {
				throw new Error('NaN error');
			}
			let isFound = false;

			for (let i = 0; i < this.products.length; i += 1) {
				if (this.products[i].id === productId && this.products[i].quantity >= quantity) {
					this.products[i].quantity = this.products[i].quantity - quantity;
					if (this.products[i].quantity === 0) {
						this.moneyEarned += this.products[i].price * quantity;
						this.products.splice(i, 1);
						isFound = true;
						break;
					}
					this.moneyEarned += this.products[i].price * quantity;
					isFound = true;
					break;
				}
			}
			if (!isFound) {
				throw new Error('wrong quantity');
			}

			return this;
		}

		getSold() {
			return this.moneyEarned;
		}

		//Needs to be fixed
		search(pattern) {

			let copyOfTheOriginalProductsArray = [];

			for (let i = 0; i < this.products.length; i += 1) {
				copyOfTheOriginalProductsArray[i] = this.products[i];
			}

			for (let i = 0; i < copyOfTheOriginalProductsArray.length; i += 1) {
				delete copyOfTheOriginalProductsArray[i].quantity;
			}

			let foundPatternMatches = [];

			if (typeof pattern === 'string') {
				for (let i = 0; i < copyOfTheOriginalProductsArray.length; i += 1) {
					if (copyOfTheOriginalProductsArray[i].model.includes(pattern) || copyOfTheOriginalProductsArray[i].manufacturer.includes(pattern)) {
						foundPatternMatches.push({
							product: copyOfTheOriginalProductsArray[i],
							quantity: copyOfTheOriginalProductsArray[i].quantity
						});
					}
				}
			}

			if (typeof pattern === 'object') {
				if (pattern.hasOwnProperty('manufacturerPattern')) {
					foundPatternMatches = this.products.filter(obj => obj.manufacturer.includes(pattern.manufacturerPattern));
				}

				if (pattern.hasOwnProperty('modelPattern')) {
					foundPatternMatches = this.products.filter(obj => obj.model.includes(pattern.modelPattern));
				}

				if (pattern.hasOwnProperty('type')) {
					if (pattern.type === 'SmartPhone') {
						foundPatternMatches = this.products.filter(obj => obj instanceof SmartPhone);
					}
					else if (pattern.type === 'Charger') {
						foundPatternMatches = this.products.filter(obj => obj instanceof Charger);
					}
					else if (pattern.type === 'Router') {
						foundPatternMatches = this.products.filter(obj => obj instanceof Router);
					}
					else if (pattern.type === 'Headphones') {
						foundPatternMatches = this.products.filter(obj => obj instanceof Headphones);
					}
				}

				if (pattern.hasOwnProperty('minPrice')) {
					foundPatternMatches = this.products.filter(obj => obj.price > pattern.minPrice);
				}

				if (pattern.hasOwnProperty('maxPrice')) {
					foundPatternMatches = this.products.filter(obj => obj.price < pattern.maxPrice);
				}
			}

			return foundPatternMatches;
		}
	}

	return {
		getSmartPhone(manufacturer, model, price, screenSize, operatingSystem) {
			return new SmartPhone(manufacturer, model, price, screenSize, operatingSystem);
		},
		getCharger(manufacturer, model, price, outputVoltage, outputCurrent) {
			return new Charger(manufacturer, model, price, outputVoltage, outputCurrent);
		},
		getRouter(manufacturer, model, price, wifiRange, lanPorts) {
			return new Router(manufacturer, model, price, wifiRange, lanPorts);
		},
		getHeadphones(manufacturer, model, price, quality, hasMicrophone) {
			return new Headphones(manufacturer, model, price, quality, hasMicrophone);
		},
		getHardwareStore(name) {
			return new HardwareStore(name);
		}
	};
}

module.exports = solve;

