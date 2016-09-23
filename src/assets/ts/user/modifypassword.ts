/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../../typings/angular-file-upload/angular-file-upload.d.ts"/>

var modifypassword = angular.module("webim.usermodifypassword", ["webim.main.server"]);

modifypassword.controller("modifypasswordController", ["$scope", "$state", "mainServer", "mainDataServer", "conversationServer",
    function($scope: any, $state: angular.ui.IStateService, mainServer: mainServer, mainDataServer: mainDataServer, conversationServer:conversationServer) {
        $scope.user = {
            oldpassword: "",
            newpassword: "",
            repeatpassword: ""
        }

        $scope.validate = {
            oldpassworderror: false
        }
        $scope.$watch("user.oldpassword", function() {
            $scope.validate.oldpassworderror = false;
        })

        $scope.back = function() {
            // $state.go("main.userinfo");
            window.history.back();
        }

        $scope.save = function() {
            if ($scope.formModifyPWD.$valid) {
                //修改密码
                mainServer.user.modefiyPassword($scope.user.newpassword, $scope.user.oldpassword).success(function(rep) {
                    if (rep.code == 200) {
                        // $state.go("main.userinfo");
                        logout();
                        webimutil.Helper.alertMessage.success("修改成功,请重新登录", 2);
                    } else if (rep.code == 1000) {
                        $scope.validate.oldpassworderror = true;
                    }

                }).error(function(rep) {

                });
            }
        }



        $scope.validRepeatPwd = function () {
             var newpassword = angular.element(document.getElementById("newPW"));
             var repeatpassword = angular.element(document.getElementById("renewPW"));
             if(!repeatpassword.val()){
                 return;
             }
             var result = repeatpassword.val() != newpassword.val();
             $scope.formModifyPWD.repeatpassword.$setValidity("pwmatch", !result);
        };

        function logout() {
            mainServer.user.logout().success(function() {
                webimutil.CookieHelper.removeCookie("loginuserid");//清除登录状态
                mainDataServer.loginUser = new webimmodel.UserInfo();//清除用户信息
                conversationServer.historyMessagesCache.length = 0;
                if (window.Electron) {
                    window.Electron.webQuit();
                }
                $state.go("account.signin");
            })
        }

    }]);
