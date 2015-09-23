/**
 * Created by jack on 15-8-14.
 */
var remoteloaded=true;
angular.module('app.controllers')
    .controller('initController', function($scope, $interval,$timeout, $ionicModal,$rootScope) {
        $scope.socket=null;
        $scope.data=[];
        $scope.servertime = 100;
        $scope.configdata=localStorage.configdata?JSON.parse(localStorage.configdata):{};
        if (!localStorage.showlines)localStorage.showlines = 5;

        console.log('initController');


        $ionicModal.fromTemplateUrl(localStorage.serverurl+'app/room/templates/config.html?t='+(new Date().getTime()), {
            scope: $scope
        }).then(function(modal) {
            $scope.configmodal = modal;
            $rootScope.$broadcast('initWebSocket', $scope);

        });

        //make config
        $scope.makeConfig=function(configdata){
            localStorage.configdata=JSON.stringify(configdata);
            localStorage.serverurl=configdata.serverurl;
            $scope.configmodal.hide();
            window.location.reload();

        };




    });
