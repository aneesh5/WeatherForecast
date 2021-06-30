// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource','ngStorage']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
});

// SERVICES
weatherApp.service('cityService', function() {
  
    this.city = "hyderabad";
  
    
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope','$localStorage' ,'cityService', function($scope, $localStorage, cityService) {
    
    if($localStorage.dataStorage){
        $scope.city = $localStorage.dataStorage;
    }
    else{
        $scope.city = cityService.city;
    }
    
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city,
        $localStorage.dataStorage = cityService.city
    });
    
}]);

weatherApp.controller('forecastController', ['$scope','$localStorage', '$http', '$routeParams', 'cityService', function($scope, $localStorage, $http, $routeParams, cityService) {
    
    $scope.city = $localStorage.dataStorage;
    console.log($scope.city);
    
    $scope.notFound = false;
    
    $scope.days = $routeParams.days || '0';
    
    //visit weatherapi.com and get your api key and paste in the url

    //MAKING A GET REQUEST USING THAT API
    $http.get("http://api.weatherapi.com/v1/forecast.json?key={{your api key}}&q=" + $scope.city + "&days=" +$scope.days )
        .success(function (result) {

           $scope.weatherResult = result;
           $scope.len = $scope.weatherResult.forecast.forecastday.length-0;
           console.log($scope.len);
        
        })
        .error(function (data, status) {
            $scope.notFound = true;
            console.log(data);

        });

  
    
}]);

