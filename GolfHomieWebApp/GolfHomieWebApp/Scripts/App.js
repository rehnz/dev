
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
    mainApp.controller("loginController", function($scope, $http,$window) {


        $scope.user = {};
        
        $scope.sendForm = function ()
        {
            $http({ 
                method:'POST', 
                url: 'Home/CheckLogin/', 
                data: $scope.user
            })
           
            .success(function (result)
                   {
                        if (result.email == $scope.user.email && result.password == $scope.user.password)
                        {
                            
                            alert("Welcome back - " + result.username)
                            $window.location.href = '/home/admin'
                        }
                        else
                        {
                            alert("fail")
                        }
                   }
            )
         
           
        }
    })