var wishListApp = angular.module('wishListApp', [])

wishListApp.service('wishListService', function () {
  this.getUrl = function(callback) {
    var model = {};
// Gets all tabs that have the specified properties, or all tabs if no properties are specified.
    chrome.tabs.query({'active': true},
    function (tabs) {
      if (tabs.length > 0)
      {
        model.title = tabs[0].title;
        model.url = tabs[0].url;

// Sends a single message to the content script(s) in 
// the specified tab, with an optional callback to run when a response is sent back. 
        chrome.tabs.sendMessage(tabs[0].id, { 'action': 'GetUrl' }, function (response) {
          model.getUrls = response;
          callback(model);
        });
      }
    });
  };
});

wishListApp.controller('wishListCtrl', function($scope, wishListService){
    $scope.amount =0;

    $scope.getUrl = function () {
      wishListService.getUrl(function(info){
    $scope.productName = info.title;
    $scope.url = info.url;
    $scope.getUrls = info.getUrls;
    $scope.$apply();
  });
    }



  $scope.save = function () {
    chrome.storage.local.get({wishList: []}, function (result) {
      var wishList = result.wishList;
      wishList.push({"Product": $scope.productName, "URL": $scope.url, "Price": $scope.amount})
      chrome.storage.local.set({wishList: wishList}, function(){
        chrome.storage.local.get('wishList', function(result){
          $scope.test = result.wishList.reverse();
          // console.log($scope.test);
        });
      });
    })
  };

  $scope.delete = function () {
    chrome.storage.local.get({wishList: []}, function (item) {
      item.wishList.splice(0,1);
      chrome.storage.local.set(item, function () {
        console.log('deleted!');
      })
    })
  };
});

// chrome.storage.local.clear()




