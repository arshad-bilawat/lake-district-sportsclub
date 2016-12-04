(function () {
    'use strict';

    var services = angular.module('services', [])
        .service('salesService', function ($http, $q) {


            this.getProductCategories = function () {
                var dfr = $q.defer();

                this.getData("data/categories.json", function (data) {
                    var jsonData = JSON.parse(data);
                    if (jsonData) {
                        dfr.resolve(jsonData);
                    }
                }, function (message) {
                    dfr.reject('Error while getting the data');
                });

                return dfr.promise;

            }

            this.getProducts = function () {
                var dfr = $q.defer();

                this.getData("data/products.json", function (data) {
                    var jsonData = JSON.parse(data);
                    if (jsonData) {
                        dfr.resolve(jsonData);
                    }
                }, function (message) {
                    dfr.reject('Error while getting the data');
                });

                return dfr.promise;
            }

            this.getSale = function (year) {
                var dfr = $q.defer();

                this.getData("data/sales.json", function (data) {
                    var jsonData = JSON.parse(data);

                    if (jsonData) {
                        if (year) {
                            var response = [];
                            jsonData.forEach(function (element) {
                                var saleDate = new Date(element.date);
                                if (saleDate.getFullYear() === year) {
                                    response.push(element);
                                }
                            }, this);
                            dfr.resolve(response);
                        }
                        else {
                            dfr.resolve(jsonData);
                        }


                    }
                }, function (message) {
                    dfr.reject('Error while getting the data');
                });

                return dfr.promise;

            }

            this.getData = function (file, callback, error) {
                try {
                    var rawFile = new XMLHttpRequest();
                    rawFile.overrideMimeType("application/json");
                    rawFile.open("GET", file, true);
                    rawFile.onreadystatechange = function () {
                        if (rawFile.readyState === 4 && rawFile.status == "200") {
                            callback(rawFile.responseText);
                        }
                    }
                    rawFile.send(null);
                }
                catch (err) {
                    error(err);
                }
            }

        });

} ());