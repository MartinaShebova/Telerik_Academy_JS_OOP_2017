/* globals module */

"use strict";

function solve() {

    class Product {
        constructor(productType, name, price) {
            this.productType = productType;
            this.name = name;
            this.price = Number(price);
        }

        get name() {
            return this._name;
        }

        set name(x) {

            if (typeof x !== 'string') {
                throw new Error('name must be a string');
            }

            this._name = x;
        }
    }

    class ShoppingCart {
        constructor() {
            this.products = [];
        }

        add(product) {

            if (typeof product !== 'object') {
                throw new Error('product must be an object or an object-like object');
            }

            this.products.push(product);
            return this;
        }

        remove(product) {

            if (this.products.length < 0) {
                throw new Error('empty products array');
            }

            if (typeof product !== 'object') {
                throw new Error('product must be an object or an object-like object');
            }


            let isFound = false;

            for (let i = 0; i < this.products.length; i += 1) {
                if (this.products[i].name === product.name &&
                    this.products[i].productType === product.productType &&
                    this.products[i].price === product.price) {
                    isFound = true;
                    this.products.splice(i, 1);
                }
            }

            if (!isFound) {
                throw new Error('the product does not exist');
            }
        }

        showCost() {

            if (this.products.length < 0) {
                return 0;
            }

            let sum = 0;

            for (let i = 0; i < this.products.length; i += 1) {
                sum += this.products[i].price;
            }

            return sum;
        }

        showProductTypes() {

            if (this.products.length < 0) {
                return [];
            }

            let uniqueProductTypesArray = [];

            for (let i = 0; i < this.products.length; i += 1) {
                if (uniqueProductTypesArray.indexOf(this.products[i].productType) === -1) {
                    uniqueProductTypesArray.push(this.products[i].productType);
                }
            }

            uniqueProductTypesArray.sort();
            return uniqueProductTypesArray;
        }

        getInfo() {

            let result = [];

            let uniqueProductName = [];

            for (let i = 0; i < this.products.length; i += 1) {
                if (uniqueProductName.indexOf(this.products[i].name) === -1) {
                    uniqueProductName.push(this.products[i].name);
                }
            }

            for (let i = 0; i < uniqueProductName.length; i += 1) {
                let currentTotalPrice = 0;
                let currentQuantity = 0;
                let currentGetInfo = {};

                for (let j = 0; j < this.products.length; j += 1) {
                    if (uniqueProductName[i] === this.products[j].name) {
                        currentTotalPrice += this.products[j].price;
                        currentQuantity += 1;
                    }
                }

                currentGetInfo.name = uniqueProductName[i];
                currentGetInfo.totalPrice = currentTotalPrice;
                currentGetInfo.quantity = currentQuantity;

                result.push(currentGetInfo);
            }

            return {
                totalPrice: this.showCost(),
                products: result
            };
        }

    }

    return {
        Product,
        ShoppingCart
    };

}

module.exports = solve;