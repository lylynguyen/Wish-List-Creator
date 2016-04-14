var wishListApp = angular.module('wishListApp', ['ngMaterial']);

wishListApp.service('wishListService', function () {
  this.getUrl = function(callback) {
    var model = {};
    chrome.tabs.query({'active': true}, function (tabs) {
      if(tabs.length > 0) {
        model.title = tabs[0].title;
        model.url = tabs[0].url;
        chrome.tabs.sendMessage(tabs[0].id, { 'action': 'GetUrl' }, function (response) {
          model.getUrls = response;
          callback(model);
        });
      }
    });
  };
});

wishListApp.controller('wishListCtrl', function($scope, wishListService){
  $scope.amount = 0;

  $scope.getUrl = function () {
    wishListService.getUrl(function(info){
      $scope.productName = info.title;
      $scope.url = info.url;
      $scope.getUrls = info.getUrls;
      $scope.$apply();
      }
    );
  }

  $scope.save = function () {
    chrome.storage.local.get({wishList: []}, function (result) {
      var wishList = result.wishList;
      wishList.push({"Product": $scope.productName, "URL": $scope.url, "Price": $scope.amount})
      chrome.storage.local.set({wishList: wishList}, function(){
        chrome.storage.local.get('wishList', function(result){
          $scope.list = result.wishList.reverse();
        });
      });
    })
  };

  $scope.delete = function (idx) {
    chrome.local.storage.remove(item);
    // chrome.storage.local.get({wishList: []}, function (item) {
    //   item.wishList.splice(0,1);
    //   chrome.storage.local.set(item, function () {
    //     console.log('deleted!');
    //   })
    // })
  };
});






