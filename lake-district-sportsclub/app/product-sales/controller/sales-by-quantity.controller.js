(function () {
    'use strict';

    var salesByQuantity = angular.module('salesByQuantity', ['ui.router', 'services'])

    salesByQuantity.controller('salesByQuantityController', function ($scope, $rootScope, $stateParams, $q, salesService) {
        $scope.years = [{ year: 2016 }, { year: 2015 }, { year: 2014 }]
        $scope.selectedYear = $scope.years[0]
        $scope.sortReverse = true;  // set the default sort order
        $scope.salesByCategory;
        $scope.categories;
        $scope.products;
        $scope.sales;
        $scope.categoriesDist = {};
        $scope.productsDist = {};
        $scope.salesDist = {};
        $scope.productList = [];
        let promises = {
            categories: salesService.getProductCategories(),
            products: salesService.getProducts(),
            sales: salesService.getSale()
        }

        $rootScope.$on('$stateChangeStart', function(next, current) { 
            $rootScope.$broadcast("yearChanged", $scope.years[0].year);
        });

        $scope.onYearChange = function () {
            $rootScope.$broadcast("yearChanged", $scope.selectedYear.year);
            var promise = salesService.getSale($scope.selectedYear.year)
            promise.then(function (result) {
                $scope.sales = result;
                $scope.calculateSalesByQuantities();
            }, function (failureReason) {
                console.log(reason);
            });
        };

        $q.all(promises).then((values) => {
            $scope.categories = values.categories;
            $scope.products = values.products;
            $scope.sales = values.sales;
            $scope.calculateSalesByQuantities()
        });

        $scope.calculateSalesByQuantities = function () {
            $scope.categoriesDist = {};
            $scope.productsDist = {};
            $scope.salesDist = {};
            $scope.productList = [];
            for (let i = 0; i < $scope.products.length; i++) {
                $scope.productsDist[$scope.products[i].id] = {
                    name: $scope.products[i].name,
                    categoryId: $scope.products[i].categoryId,
                    price: $scope.products[i].price
                }
            }

            for (let j = 0; j < $scope.categories.length; j++) {
                $scope.categoriesDist[$scope.categories[j].id] = {
                    name: $scope.categories[j].name
                }
            }

            for (let k = 0; k < $scope.sales.length; k++) {
                $scope.salesDist[$scope.sales[k].productId] = {
                    date: $scope.sales[k].date,
                    quantity: $scope.sales[k].quantity
                }
            }

            var result = [];
            for (let l = 0; l < $scope.sales.length; l++) {
                if (!result[$scope.sales[l].productId]) {
                    result[$scope.sales[l].productId] = {
                        quantity: 0,
                        productId: $scope.sales[l].productId
                    }
                }
                result[$scope.sales[l].productId].quantity += $scope.sales[l].quantity;
            }

            $scope.salesByCategory = result;


            $scope.products.forEach(function (element) {
                if (result[element.id]) {
                    $scope.productList.push({
                        name: element.name,
                        category: $scope.categoriesDist[element.categoryId].name,
                        quantity: result[element.id].quantity
                    })
                }
            }, this);
        }

        $scope.descendingOrder = function () {
            $scope.sortReverse = false;
        }

        $scope.ascendingOrder = function () {
            $scope.sortReverse = true;
        }

    });

} ());