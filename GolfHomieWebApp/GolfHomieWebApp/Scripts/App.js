
var mainApp = angular.module('mainApp', []);


mainApp.filter("jsDate", function () {
    return function (x) {
        return new Date(parseInt(x.substr(6)));
    };
});

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

// Controller to verify login
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
                            $window.location.href = '/Profile/Dashboard'
                        }
                        else
                        {
                            alert("fail")
                        }
                   }
            )
         
           
        }
    })

//controller to get user scores
    mainApp.controller('scoresController', function ($scope, $http) {
        $http.get('/Profile/GetScores')
            .success(function (result) {
                $scope.scoresModel = JSON.parse(result);
                for (var i in $scope.scoresModel) {
                    $scope.scoresModel[i].dateplayed = new Date(parseInt(dateplayed.CreatedOn.substr(6)));
                }
            })
            .error(function (errorLog) {
                alert(errorLog)
            })
    })