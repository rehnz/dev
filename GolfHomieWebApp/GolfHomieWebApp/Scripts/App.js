
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
    mainApp.controller("loginController", function($scope, $http) {


        $scope.user = {};
        
        $scope.sendForm = function ()
        {
            $http({ 
                method:'POST', 
                url: 'Home/CheckLogin/', 
                data: $scope.user
            })
           
            .success(function ()
                   {
                         $http.get('/Home/Admin');
                   }
            )
           .error(function (reason)
                    {
                      alert("Error: Posting Log in Info.");
                    }
            );
        }
    })