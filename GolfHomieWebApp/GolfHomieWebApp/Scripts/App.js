
var mainApp = angular.module('mainApp', []);


//Get a list of Users
    mainApp.controller('usersController', function ($scope, $http)
{
    $http.get('/Home/GetUsers')
        .success(function (result) 
        {
            $scope.usersModel = JSON.parse(result);
            
        })
        .error(function (errorLog)
        {
            alert(errorLog)
        })
    })

// Controller for Login Screen
    mainApp.controller('loginController', function ($scope, $http) {
        $http.get('/Home/Login')
            .success(function (result) {
                $scope.usersModel = JSON.parse(result);

            })
            .error(function (errorLog) {
                alert(errorLog)
            })
    })