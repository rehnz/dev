
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

        dashboardFactory.getScores().success(function (data)
        {
           
            $scope.scoresModel = JSON.parse(data)

            for (var i in $scope.scoresModel)
            {
                $scope.scoresModel[i].dateplayed = (new Date(parseInt($scope.scoresModel[i].dateplayed.substr(6)))).toJSON();
            }
        }).error(function ()
            {
              //error logic
           
        })

        dashboardFactory.getCourses().success(function(courseData)
        {
            $scope.coursesModel = JSON.parse(courseData);
        })
        
        })


//Factory for DashBoard View
    mainApp.factory('dashboardFactory', function ($http)
    {
        var data = {};
        data.getScores = function ()
        {
            return $http.get("/Profile/GetScores").success(function (scoresData)
            {
           

                return scoresData;

            });         
        }

        data.getCourses = function ()
        {
            return $http.get('/Profile/GetCourses').success(function(coursesData)
            
            {
                return coursesData;
            })
        }
        return data;
           
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
    
        