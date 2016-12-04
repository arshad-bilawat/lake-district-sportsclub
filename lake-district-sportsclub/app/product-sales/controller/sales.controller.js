(function () {
    'use strict';

    var sales = angular.module('sales', ['ui.router', 'services'])

    sales.controller('salesController', function ($scope, $rootScope, $stateParams, $q, salesService) {
        $scope.totalSales = 0;
        $scope.products;
        $scope.sales;
        $scope.productsDist = [];

        let promises = {
            products: salesService.getProducts(),
            sales: salesService.getSale(2016)
        }

        $q.all(promises).then((values) => {
            $scope.products = values.products;
            $scope.sales = values.sales;
            $scope.calculateSales()
        });

        $scope.$on("yearChanged", function (evt, data) {
         var promise = salesService.getSale(data)
            promise.then(function (result) {
                $scope.sales = result;
                $scope.calculateSales();
            }, function (failureReason) {
                console.log(reason);
            });
        });

        $scope.calculateSales = function () {
            $scope.totalSales=0;
            $scope.productsDist=[];
            for (let i = 0; i < $scope.products.length; i++) {
                $scope.productsDist[$scope.products[i].id] = {
                    id: $scope.products[i].id,
                    price: $scope.products[i].price
                }
            }

            $scope.sales.forEach(function (element) {                
                $scope.totalSales += element.quantity * $scope.productsDist[element.productId].price
            }, this);
        }
    });
} ());