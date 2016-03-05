
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
        $scope.getMasterData = function ()
        {
            dashboardFactory.getScores().success(function (data) {

                $scope.scoresModel = JSON.parse(data)

                for (var i in $scope.scoresModel) {
                    $scope.scoresModel[i].dateplayed = (new Date(parseInt($scope.scoresModel[i].dateplayed.substr(6)))).toJSON();
                }
            }).error(function () {
                //error logic

            });

            dashboardFactory.getCourses().success(function (courseData) {
                $scope.coursesModel = JSON.parse(courseData);

            })
        };
        
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

          // can do another thing here...
        }

      
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









        var hudControllers = angular.module('hudControllers', []);

        hudControllers.controller('PropertyDetailsCtrl', 
          ['$scope','$window','$http', function ($scope,$window,$http) {

              //I want to reload this once the newCommentForm below has been submitted
              $scope.initFirst=function()
              {


                  $http.get('/api/comments')
                   .success(function(data) {})
                   .error(function(data) {});

                       //You need to define your required $scope.....

                       $scope.myVariable=data;

              };

              $scope.newCommentForm = function(){

                  newComment=$scope.newComment;
                  requestUrl='/api/comments';
                  var request = $http({method: "post",url: requestUrl,data: {}});
                  request.success(function(data){
                      //How do I refresh/reload the comments?
                      //without calling anything else, you can update your $scope.myVariable here directly like this


                      $scope.myVariable=data


                  });

                  //or else you can call 'initFirst()' method whenever and wherever needed like this,

                  $scope.initFirst();


              };

          }]);