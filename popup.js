var wishListApp = angular.module('wishListApp', [])
wishListApp.factory('wishListFactory', function(){
  return {
    // url: window.location.href
    chrome: function(){
      chrome.tabs.getSelected(null, function(tab) {
        current_tab = tab;
      }
    }
  }
});

wishListApp.controller('wishListCtrl', function($scope, wishListFactory){
  $scope.url = wishListFactory.url;

});


// function init()
// {
//   chrome.tabs.getSelected(null, function(tab) 
//   {
//     current_tab = tab;
//     background_page.shortenUrl(tab.url, tab.incognito, onResponse);
//   });
// }
