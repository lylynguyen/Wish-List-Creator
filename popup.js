var wishListApp = angular.module('wishListApp', [])
wishListApp.factory('wishListFactory', function(){
  return {
    url: window.location.href
  }
});

wishListApp.controller('wishListCtrl', function($scope, wishListFactory){
  $scope.url = wishListFactory.url;

});


