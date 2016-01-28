
var mainApp = angular.module('mainApp', []);

    mainApp.controller('homeController', function ($scope, $http)
{
    $http.get('/Home/GetUsers')
        .success(function (result) 
        {
            $scope.usersModel = (result);
            alert(JSON.stringify(result));
        })
        .error(function (data)
        {
            alert(data)
        })
    })