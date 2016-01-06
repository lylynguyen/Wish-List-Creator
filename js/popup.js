var wishListApp = angular.module('wishListApp', [])
  

wishListApp.service('wishListService', function() {
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

  // wishListService.getUrl(function(info){
  //   $scope.productName = info.productName;
  //   $scope.url = info.url;
  //   $scope.getUrls = info.getUrls;
  //   $scope.amount;
  //   $scope.test = ""

  //   $scope.$apply();
  // });

    wishListService.getUrl(function(info){
    $scope.productName = info.title;
    $scope.url = info.url;
    $scope.getUrls = info.getUrls;
    $scope.amount;

    $scope.$apply();
  });

  $scope.updateView = function(){
    chrome.storage.onChange.addListener(function(changes, namespace){
      for(var key in $scope.test){
        var storageChange = changes[key];
        console.log('change recieved!');
      }
    })
  }

  $scope.save = function(){
    chrome.storage.local.get({wishList: []}, function(result){
      var wishList = result.wishList;
      wishList.push({"Product": $scope.productName, "URL": $scope.url, "Price": $scope.amount})
      chrome.storage.local.set({wishList: wishList}, function(){
        chrome.storage.local.get('wishList', function(result){
          $scope.test = result.wishList;
        });
      });     
    })
  }
});




