
var mainApp = angular.module('mainApp', []);

mainApp.controller('homeController', function ($scope, $http)
{
    $http.get('Home/GetUsers/')
        .success(function (result) 
        {
            $scope.user = result;
        }
        .error(function (data)
        {
            console.log(data)
        })
    )})