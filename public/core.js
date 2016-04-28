angular.module('messageApp', ['ui.bootstrap'])
  .controller('mainController', function($scope, $http) {

    $scope.poolInput = "";
    $scope.sendInput = "";
    $scope.scheduleInput = "";
    $scope.messages = null;
    $scope.schedule = null;
    $scope.groupme = null;
    $scope.popup = false;
    $scope.date = new Date();
    $scope.regexes = [];
    $scope.curExp = "";
    $scope.curResp = [];


    /** Date and Time **/
    $scope.openPopup = function() {
      $scope.popup = true;
    };

    $scope.today = function() {
      $scope.datet = new Date();
    };
    //$scope.today();



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

    $scope.updateRegex = function() {
        item = {};
        item.exp = curExp;
        item.responses = curResp;
        $http.post('/api/expressions', item)
        .success(function(data) {
            $scope.regexes = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    $scope.deleteRegex = function(id) {
        $http.delete('/api/expressions/' + id)
          .success(function(data) {
            $scope.regexes = data;
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };




    /* Message Pool */

    // when landing on the page, get all messages and show them
    $scope.getMessages = function() {
      $http.get('/api/messages')
        .success(function(data) {
          $scope.messages = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    // when submitting the add form, send the text to the node API
    $scope.createMessage = function() {
      item = {};
      item.text = $scope.poolInput;
      $http.post('/api/messages', item)
        .success(function(data) {
          $scope.poolInput = ""; // clear the form so our user is ready to enter another
          $scope.messages = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    // delete a message after checking it
    $scope.deleteMessage = function(id) {
      $http.delete('/api/messages/' + id)
        .success(function(data) {
          $scope.messages = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

  });
