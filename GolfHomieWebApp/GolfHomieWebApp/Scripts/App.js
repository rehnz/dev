
var mainApp = angular.module('mainApp', []);

mainApp.controller('homeController', function ($scope, $http) {
    $http.get('/home/GetUsers')
        .success(function (result) {
            $scope.user = result;
            console.log(result)
        })
        .error(function (data) {
            console.log(data)
        })
});