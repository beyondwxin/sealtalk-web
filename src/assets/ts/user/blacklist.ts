/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../../typings/angular-file-upload/angular-file-upload.d.ts"/>

var userinfo = angular.module("webim.blacklist", ["webim.main.server"]);

userinfo.controller("blacklistController", ["$scope", "$state", "mainDataServer",
    function($scope: any, $state: angular.ui.IStateService, mainDataServer: mainDataServer) {

        $scope.back = function() {
            window.history.back();
        }

        $scope.blacklist = mainDataServer.blackList.list;

    }])

userinfo.directive("blackitem", ["mainServer", "mainDataServer", function(mainServer: mainServer, mainDataServer: mainDataServer) {
    return {
        restrict: "E",
        scope: { item: "=" },
        template: '<li class="chat_item groupUser_item">' +
        '<div class="photo">' +
        '<img class="img" ng-show="item.imgSrc" ng-src="{{item.imgSrc||\'assets/img/barBg.png\'}}" alt="">' +
        '<div class="portrait" ng-show="!item.imgSrc">{{item.firstchar}}</div>'+
        '</div>' +
        '<div class="info">' +
        '<h3 class="nickname">' +
        '<span class="nickname_text">{{item.name}}</span>' +
        '</h3>' +
        '<div class="reject">' +
        '<a href="javascript:void 0">移出黑名单</a>' +
        '</div>' +
        '</div>' +
        '</li>',
        link: function(scope: any, ele: any, attr: any) {
          angular.element(ele[0].getElementsByClassName("portrait")[0]).css("background-color", webimutil.Helper.portraitColors[scope.item.id.charCodeAt(0) % webimutil.Helper.portraitColors.length]);
            ele.find("a").on("click", function() {
                mainServer.user.removeFromBlackList(scope.item.id).success(function() {
                    mainDataServer.blackList.remove(scope.item.id);
                }).error(function(err) {
                    console.log(err);
                });
            })
        }
    }
}])
