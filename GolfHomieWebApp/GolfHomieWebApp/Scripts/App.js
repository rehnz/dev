﻿
var mainApp = angular.module('mainApp', ['ui.bootstrap']);



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
    mainApp.controller("loginController", function ($scope, $http, $window)
    {


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
                            
                            alert("Welcome - " + result.username)
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

        $scope.scoresModel  = {}
        $scope.getMasterData = function ()
        {
            dashboardFactory.getScores().success(function (data) {

                $scope.scoresData = JSON.parse(data)

                for (var i in $scope.scoresData) {
                    $scope.scoresData[i].dateplayed = (new Date(parseInt($scope.scoresData[i].dateplayed.substr(6)))).toJSON();
                    $scope.scoresModel = $scope.scoresData;
                }
            }).error(function () {
                //error logic

            });

            dashboardFactory.getCourses().success(function (courseData) {
                $scope.coursesModel = JSON.parse(courseData);

            })
        };
        
      
    
        // SEND THE ADD SCORE FORM
        $scope.newScore = {};
        $scope.sendForm = function ()
        {


            $http({ 
                method:'POST', 
                url: '/Profile/AddScore/', 
                data: $scope.newScore
            }).success(function (result) {
                alert("Score Added")   
                $scope.getMasterData();
                $scope.newScore = null;

            })

          
        }


        ///Function to Delete Scores
        $scope.scoreToDelete = {};
        $scope.deleteScore = function(id,courseid,dateplayed,score)
        {

            $scope.scoreToDelete.id = id
            $scope.scoreToDelete.courseid = courseid;
            $scope.scoreToDelete.dateplayed = dateplayed;
            $scope.scoreToDelete.score = score;

            $http
                ({
                    method: 'POST',
                    url: '/Profile/DeleteScore',
                    data: $scope.scoreToDelete
                }).success(function()
                        {
                            alert("Score Deleted")
                            $scope.getMasterData();
                            $scope.scoreToDelete = {};
                        })

        }
      


        ///Edit Scores

        $scope.editScoresData = {}

        for (var i = 0, length = $scope.scoresModel.length; i < length; i++) {
            $scope.editScoresData[$scope.scoresModel[i].id] = false;
        }

        $scope.editScore = function (score) {
            $scope.editScoresData[score.id] = true;
        };

        $scope.update = function (score) {

            $http({
                method: 'POST',
                url: '/Profile/UpdateScore',


            })
            $scope.editScoresData[score.id] = false;
        };

      
    })


        //Factory for DashBoard View Data Load
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

                        alert("Registration Complete! Please Login")
                        $window.location.href = '/'
                    }
                    else {
                        alert("Registration Failed")
                    }
                }
                )


            }
        })
    
    


        mainApp.controller("datepickerController", ["$scope", function ($scope) {

            // grab today and inject into field
            $scope.today = function () {
                $scope.dt = new Date();
            };

            // run today() function
            $scope.today();

            // setup clear
            $scope.clear = function () {
                $scope.dt = null;
            };

            // open min-cal
            $scope.open = function ($event) {
     
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
            };

            // handle formats
            $scope.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"];

            // assign custom format
            $scope.format = $scope.formats[3];

        }]);









       