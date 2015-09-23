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
        localStorage.tip=localStorage.tip?localStorage.tip:'温馨提示：不以物喜，不以己悲。居庙堂之高则忧其民；处江湖之远则忧其君。';
        if (!localStorage.showlines)localStorage.showlines = 5;

        console.log('initController');

        $scope.maketip=function(){

          $("#marquee").html(localStorage.tip);
          $("#marquee").marquee({
            //speed in milliseconds of the marquee
            duration: 35000,
            //gap in pixels between the tickers
            gap: 250,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 1000,
            pauseOnCycle:1000,
            //'left' or 'right'
            direction: 'up',
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true
          });

        };

        $scope.maketip();


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
