angular.module('messageApp', ['ui.bootstrap'])
  .controller('mainController', function($scope, $http) {

    $scope.newResp = "";
    $scope.sendInput = "";
    $scope.scheduleInput = "";
    $scope.messages = null;
    $scope.schedule = null;
    $scope.groupme = null;
    $scope.popup = false;
    $scope.date = new Date();
    $scope.regexes = [];
    $scope.curExp = {};

    /** Date and Time **/
    $scope.openPopup = function() {
      $scope.popup = true;
    };

    $scope.today = function() {
      $scope.datet = new Date();
    };
    //$scope.today();

    $scope.setCurretExp = function(regex) {
        curExp = regex;
    };

    /** API Interface **/


    /* GroupMe Conversation */

    $scope.getGroupme = function() {
      $http.get('api/groupme')
        .success(function(data) {
          $scope.groupme = data.messages;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
    $scope.getGroupme();

    $scope.sendGroupme = function(text) {
      //send message
      item = {};
      item.text = text;
      $http.post('/api/groupme', item)
        .success(function(data) {
          $scope.sendInput = '';
          $scope.groupme = data.messages;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };


    /* Scheduled Messages */

    $scope.getSchedule = function() {
      $http.get('api/schedules')
        .success(function(data) {
          $scope.schedule = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
    $scope.getSchedule();

    $scope.createSchedule = function() {
      item = {};

      item.message = $scope.scheduleInput;
      item.when = $scope.date;

      $http.post('/api/schedules', item)
        .success(function(data) {
          $scope.scheduleInput = '';
          $scope.schedule = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.deleteSchedule = function(id) {
      $http.delete('/api/schedules/' + id)
        .success(function(data) {
          $scope.schedule = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };


    /* Regexes and responses */

    $scope.getRegexes = function() {
      $http.get('/api/schedules')
        .success(function(data) {
          $scope.regexes = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
    $scope.getRegexes();

    $scope.newRegex = function() {
        var item = {};
        item.exp = $scope.newExp;
        $http.post('/api/expressions', item)
        .success(function(data) {
            $scope.regexes = data;
            $scope.newExp = null;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    $scope.updateRegex = function() {
        $http.post('/api/expressions', curExp)
        .success(function(data) {
            $scope.regexes = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    $scope.addResponse = function() {
        $scope.curExp.responses.push($scope.newResp);
        $scope.updateRegex();
    };

    $scope.deleteResponse = function(resp) {
        var index = $scope.curExp.responses.indexOf(resp);
        $scope.curExp.responses.splice(index, 1);
        $scope.updateRegex();
    };

    $scope.deleteRegex = function(id) {
        $http.delete('/api/expressions/' + id)
        .success(function(data) {
            $scope.regexes = data;
            $scope.curExp = data[0];
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };



  });
