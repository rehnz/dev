
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

//controller for the Dashboard View
    mainApp.controller('dashboardController',function ($scope,dashboardFactory,$http)
            {
               var scoresModel =  dashboardFactory.getScores();
                

            })


//Factory for DashBoard View
    mainApp.factory('dashboardFactory', function ($http)
    {
        var getScores = function ()
        {
            $http.get("/Profile/GetScores").success(function (result)

            {
                var scoresModel = JSON.parse(result);

                for (var i in scoresModel)
                {
                    scoresModel[i].dateplayed = (new Date(parseInt(scoresModel[i].dateplayed.substr(6)))).toJSON();
                }
                return (scoresModel)
                
            })
        }
            return getScores();
    })

      
          

    //Get a list of Courses
    mainApp.controller('coursesController', function ($scope, $http)
    {
        $http.get('/Profile/GetCourses')
            .success(function (result) 
            {
                $scope.coursesModel = JSON.parse(result);
            
            })



        //Controller to Register new user
        mainApp.controller("registerController", function ($scope, $http, $window) {


            $scope.registerUser = {};

            $scope.sendForm = function ()
            {
                $http({
                    method: 'POST',
                    url: 'Home/Register/',
                    data: $scope.registerUser
                })

                .success(function (result) {
                    if (result.email == $scope.registerUser.email && result.password == $scope.registerUser.password) {

                        alert("Register Complete! Please Login")
                        $window.location.href = '/'
                    }
                    else {
                        alert("Registration Failed")
                    }
                }
                )


            }
        })
    })
        