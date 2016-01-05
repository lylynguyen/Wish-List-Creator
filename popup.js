var wishListApp = angular.module('wishListApp', [])


wishListApp.service('wishListService', function() {
    this.getUrl = function(callback) {
        var model = {};
// Gets all tabs that have the specified properties, or all tabs if no properties are specified.
// chrome.tabs.query(object queryInfo, function callback) 
        chrome.tabs.query({'active': true},
        function (tabs) {
            if (tabs.length > 0)
            {
                model.title = tabs[0].title;
                model.url = tabs[0].url;
// chrome.tabs.sendMessage(integer tabId, any message, object options, function responseCallback)
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
  // $scope.url = wishListFactory.url;
  wishListService.getUrl(function(info){
    $scope.title = info.title;
    $scope.url = info.url;
    $scope.getUrls = info.getUrls;

    $scope.$apply();
  });
});




