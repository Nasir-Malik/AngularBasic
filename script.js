// Code goes here
(function() {

  var app = angular.module('myApp', []);
  app.controller('myCtrl', function($scope, $http) {

    $scope.load = function() {
      $http.get("https://api.github.com/users")
        .then(function(response) {
          $scope.persons = response.data;
        }, onError);
    };

    $scope.searchByName = function(){
      $scope.reason = "";
      $http.get("https://api.github.com/users/" + $scope.personLogin)
        .then(onSearchByNameComplete, onError);
    }
  
    $scope.search = function() {
      $scope.reason = "";
      $http.get($scope.person.repos_url)
        .then(onGetRepos, onError);
    };

    var onSearchByNameComplete = function(response) {
      $scope.person = response.data;
      $scope.search();
    };

    var onGetRepos = function(response) {
      $scope.repos = response.data;
    };

    var onError = function(reason) {
      $scope.reason = "Cold not fetch data";
    };

  });

}());