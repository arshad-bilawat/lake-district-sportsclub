(function () {
    'use strict';

    angular.module('lakeDistrictSports', [
        'ui.router',
        'sales',
        'salesByQuantity',
        'salesByCategory',
        'salesbyAmount',
        'services',
        'filters'])
        .config(function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/sales/amount');

            $stateProvider
                .state('sales', {
                    url: '/sales',
                            templateUrl: './product-sales/templates/sales.template.html',
                            controller: 'salesController'
                       
                })
                .state('sales.amount', {
                    url: '/amount',
                    templateUrl: './product-sales/templates/sales-by-amount.template.html',
                    controller: 'salesbyAmountController'
                })
                .state('sales.quantity', {
                    url: '/quantity',
                    templateUrl: './product-sales/templates/sales-by-quantity.template.html',
                    controller: 'salesByQuantityController'
                })
                .state('sales.category', {
                    url: '/category',
                    templateUrl: './product-sales/templates/sales-by-category.template.html',
                    controller: 'salesByCategoryController'
                })

        });

} ());